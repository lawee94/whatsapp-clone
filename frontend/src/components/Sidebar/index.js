import React, { useState } from "react";
import { IconButton, Avatar } from "@material-ui/core";
import {
    SearchOutlined,
    AddBox,
    DonutLarge,
    MoreVert,
} from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import NewRoom from "../NewRoom/NewRoom";
import { useStateValue } from "../Logic/StateProvider";
import "./Sidebar.css";

const Sidebar = ({ rooms, setCurrent }) => {
    const [{ user }] = useStateValue();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLarge />
                    </IconButton>
                    <IconButton onClick={handleOpen}>
                        <AddBox />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>

            <div className="sidebar__chat">
                {rooms.map((room, index) => (
                    <SidebarChat
                        key={index}
                        room={room}
                        setCurrent={setCurrent}
                    />
                ))}
            </div>

            <NewRoom open={open} handleClose={handleClose} />
        </div>
    );
};

export default Sidebar;
