import React from "react";
import firebase from 'firebase'
import {
  useHistory,
} from "react-router-dom";

// Import Styles
import "./Sidebar.css";

// Import Icons
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton, Avatar } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";

// Import Components
import SidebarChat from "../SidebarChat/SidebarChat";

const Sidebar = () => {

  const history = useHistory

  const signOut = () => {
    firebase.auth().signOut().then(function() {
        alert('Sesion Cerrada')
        history.push('/')
      }).catch(function(error) {

      });
  }

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src="" />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Busca o inicia un nuevo chat" type="text" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat />
        <SidebarChat />
        {/* <SidebarChat /> */}
        <button onClick={signOut}>Enviar</button>
      </div>
    </div>
  );
};

export default Sidebar;
