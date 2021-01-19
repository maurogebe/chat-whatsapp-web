import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router
  } from "react-router-dom";

// Import Style
import "./container-chat.css";

// Import components
import Sidebar from "./Sidebar/Sidebar";
import Chat from "./message-chat/Chat";

function ContainerChat() {
  let [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);

  // Accediendo a las conversaciones
  useEffect(() => {
    let users = []
    let conversationsUsers = []
    let conversationsProfile = []
    let uid = localStorage.getItem('uid')

    // Accediendo a todos los usuarios para despues hacer el match con el uid del localStorage
    fetch("https://academlo-whats.herokuapp.com/api/v1/users")
      .then(response => response.text())
      .then(result => {
          users = JSON.parse(result)
          let user = users.find( u => u.uid === uid)
          console.log(user)

          // Accediendo a las conversaciones del User
          fetch(`https://academlo-whats.herokuapp.com/api/v1/users/${user._id}/conversations`)
            .then(response => response.text())
            .then(result => {
                conversationsUsers = JSON.parse(result)
                conversationsUsers.forEach( con => {
                  if(con.members[0] === user._id || con.members[1] === user._id) {
                    conversationsProfile.unshift(con)
                  }
                })
                setConversations(conversationsProfile)
            })
            .catch(error => console.log('error', error));
      })
      .catch(error => console.log('error', error));
  }, [])

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