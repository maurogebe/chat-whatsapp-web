import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";

function App() {
  const [messages, setMessages] = useState([]);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
