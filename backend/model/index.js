import mongoose from "mongoose";

const RoomSchema = mongoose.Schema({
    roomName: String,
});

const MessageSchema = mongoose.Schema({
    roomId: String,
    userName: String,
    message: String,
    timestamp: String,
    received: Boolean,
});

const roomModel = mongoose.model("rooms", RoomSchema);
const msgModel = mongoose.model("messagecontents", MessageSchema);

export { roomModel, msgModel };
