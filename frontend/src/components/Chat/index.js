import React, { useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import {
    SearchOutlined,
    AttachFile,
    MoreVert,
    InsertEmoticon,
    Mic,
} from "@material-ui/icons";
import axios from "../../axios";
import { useStateValue } from "../Logic/StateProvider";
import "./Chat.css";

const Chat = ({ room }) => {
    const [{ user }] = useStateValue();
    const [input, setInput] = useState("");

    const sendMessage = async (e) => {
        e.preventDefault();

        await axios.post("/messages/new", {
            roomId: room?.room?._id,
            userName: user?.displayName,
            message: input,
            timestamp: new Date(),
        });

        setInput("");
    };

    return (
        <div className="chat ">
            <div className="chat__header">
                <Avatar />
                <div className="chat__headerInfo">
                    <h3>{room?.room?.roomName}</h3>
                    <p>Last Seen...</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {room?.messages?.length > 0 ? (
                    room.messages.map((msg, index) => {
                        return (
                            <p
                                key={index}
                                className={`chat__message ${
                                    msg.userName === user?.displayName &&
                                    "chat__reciever"
                                }`}
                            >
                                <span className="chat__name">{msg.name}</span>
                                {msg.message}
                                <span className="chat__timestamp">
                                    {msg.timestamp}
                                </span>
                            </p>
                        );
                    })
                ) : (
                    <p>No message to display</p>
                )}
            </div>

            <div className="chat__footer">
                <InsertEmoticon />
                <form onSubmit={sendMessage}>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message"
                        type="text"
                    />
                    <button type="submit">Send a message</button>
                </form>
                <Mic />
            </div>
        </div>
    );
};

export default Chat;
