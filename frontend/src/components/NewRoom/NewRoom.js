import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import axios from "../../axios";
import "./NewRoom.css";

const NewRoom = ({ open, handleClose }) => {
    const [roomName, setRoomName] = useState("");

    const createRoom = async (e) => {
        e.preventDefault();
        await axios.post("/room/new", {
            roomName: roomName,
        });
        handleClose();
    };

    return (
        <Dialog
            maxWidth="md"
            open={open}
            onClose={handleClose}
            aria-labelledby="new-room"
        >
            <DialogTitle id="new-room">Create New Room</DialogTitle>
            <DialogContent>
                <form onSubmit={createRoom} className="form">
                    <input
                        type="text"
                        name="text"
                        placeholder="room name"
                        onChange={(e) => setRoomName(e.target.value)}
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default NewRoom;
