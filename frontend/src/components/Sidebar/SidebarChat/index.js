import React from "react";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";

const sidebarChat = ({ room, setCurrent }) => {
    return (
        <div className="sidebarChat" onClick={() => setCurrent(room)}>
            <Avatar />
            <h2>{room.roomName}</h2>
        </div>
    );
};

export default sidebarChat;
