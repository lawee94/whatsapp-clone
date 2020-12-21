import React, { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Login from "./components/Login/Login";
import Pusher from "pusher-js";
import axios from "./axios";
import { useStateValue } from "./components/Logic/StateProvider";

let pusher = new Pusher("pusher_key", {
    cluster: "eu",
});

function App() {
    const [{ user }] = useStateValue();
    const [rooms, setRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState({
        room: "",
        messages: [],
    });

    const setCurrent = (room) => {
        axios.get(`/messages/${room._id}`).then((response) => {
            setCurrentRoom({ room, messages: response.data });
        });
    };

    useEffect(() => {
        axios.get("/rooms").then((response) => {
            axios
                .get(`/messages/${response?.data[0]._id}`)
                .then((response2) => {
                    setRooms(response.data);
                    setCurrentRoom({
                        room: response.data[0],
                        messages: response2.data,
                    });
                });
        });
    }, []);

    useEffect(() => {
        let msgChannel = pusher.subscribe("messages");
        msgChannel.bind("inserted", function (newMessage) {
            setCurrentRoom((prev) => ({
                ...prev,
                messages: [...prev.messages, newMessage],
            }));
        });

        return () => {
            msgChannel.unbind_all();
            msgChannel.unsubscribe();
        };
    }, [currentRoom]);

    useEffect(() => {
        let roomChannel = pusher.subscribe("room");
        roomChannel.bind("inserted", function (newRoom) {
            setRooms([...rooms, newRoom]);
        });
        return () => {
            roomChannel.unbind_all();
            roomChannel.unsubscribe();
        };
    }, [rooms]);

    return (
        <div className="app">
            {!user ? (
                <Login />
            ) : (
                <div className="app__body">
                    <Sidebar rooms={rooms} setCurrent={setCurrent} />
                    <Chat room={currentRoom} />
                </div>
            )}
        </div>
    );
}

export default App;
