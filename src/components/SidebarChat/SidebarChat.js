import { Avatar } from "@material-ui/core";
import React from "react";
import "./SidebarChat.css";

const SidebarChat = () => {
  return (
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebarChat__info">
        <h2>Nombre de la Sala</h2>
        <p>Último mensaje</p>
      </div>
    </div>
  );
};
export default SidebarChat;
