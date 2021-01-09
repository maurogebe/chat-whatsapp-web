import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

// Import Style
import "./main.css";

// Import components
import ContainerChat from "./Chat/container-chat";
import LogIn from './authentication/log-in'
import SignIn from './authentication/sign-in'

function Main() {
  const [messages, setMessages] = useState([]);

  return (
    <Router>
        <div className="app">
          <Switch>

            <Route path="/" exact>
              <LogIn />
            </Route>

            <Route path="/sign-in" exact>
              <SignIn />
            </Route>

            <Route path="/chat">
              <ContainerChat />
            </Route>

          </Switch>
        </div>
    </Router>
  );
}

export default Main;
