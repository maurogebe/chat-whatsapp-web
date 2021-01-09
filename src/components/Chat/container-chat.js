import React, { useState } from "react";
import {
    BrowserRouter as Router
  } from "react-router-dom";

// Import Style
import "./container-chat.css";

// Import components
import Sidebar from "./Sidebar/Sidebar";
import Chat from "./message-chat/Chat";

function ContainerChat() {
  const [messages, setMessages] = useState([]);

  return (
    <Router>
        <div className="app__body">
            <Sidebar />
            <Chat messages={messages} />
        </div>
    </Router>
  );
}

export default ContainerChat;