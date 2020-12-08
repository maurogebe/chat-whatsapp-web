import React, { useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import "./Chat.css";
import MicIcon from "@material-ui/icons/Mic";


const Chat = ({ messages }) => {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    setInput("");
  };
  
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>Nombre de la sala</h3>
          <p>Visto por ultima vez a las... </p>
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
        {messages.map((message, i) => {
          return (
            <p
              key={i}
              className={`chat__message ${
                message.received && "chat__reciever"
              }`}
            >
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timestamp">{message.timestamp}</span>
            </p>
          );
        })}
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
            placeholder="Escribe un mensaje"
          />
          <button onClick={sendMessage} type="submit">
            Enviar
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
