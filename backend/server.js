import Express from "express";
import mongoose from "mongoose";
import { roomModel, msgModel } from "./model";
import Pusher from "pusher";
import Cors from "cors";

// api configuration
const app = Express();
const PORT = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1085220",
    key: "d7e92d55708a24d1bb99",
    secret: "f0e194bb18049535e097",
    cluster: "eu",
    useTLS: true,
});

// api middleware
app.use(Cors());
app.use(Express.json());

// DB Configuration
const url =
    "mongodb+srv://lawee94:olawale94@cluster0.qsqj4.mongodb.net/whatsappdb?retryWrites=true&w=majority";
mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
    console.log("DB Connected");

    const roomCollection = db.collection("rooms");
    const roomStream = roomCollection.watch();

    const msgCollection = db.collection("messagecontents");
    const msgStream = msgCollection.watch();

    roomStream.on("change", (change) => {
        if (change.operationType === "insert") {
            const roomDetail = change.fullDocument;
            pusher.trigger("room", "inserted", {
                roomName: roomDetail.roomName,
            });
        }
    });

    msgStream.on("change", (change) => {
        if (change.operationType === "insert") {
            const msgDetail = change.fullDocument;
            pusher.trigger("messages", "inserted", {
                roomId: msgDetail.roomId,
                userName: msgDetail.userName,
                message: msgDetail.message,
            });
        }
    });
});

// api routes
app.get("/rooms", async (req, res) => {
    await roomModel.find((err, data) => {
        if (err) res.status(500).send(err);
        else res.status(200).send(data);
    });
});

app.get("/messages/:id", async (req, res) => {
    try {
        const msg = await msgModel.find({ roomId: req.params.id });
        if (msg) res.status(200).send(msg);
        else res.status(500).send(error);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post("/room/new", (req, res) => {
    const dbRoom = req.body;
    roomModel.create(dbRoom, (err, data) => {
        if (err) res.status(500).send(err);
        else res.status(201).send(data);
    });
});

app.post("/messages/new", (req, res) => {
    const dbMessage = req.body;
    msgModel.create(dbMessage, (err, data) => {
        if (err) res.status(500).send(err);
        else res.status(201).send(data);
    });
});

// listen
app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
