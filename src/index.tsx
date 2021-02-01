import React, { useEffect, useReducer, useState } from "react";
import ReactDOM from "react-dom";
import ChatWindow from "./chat-window";
import "./index.css";


function reducer(state: string[], toAdd: string) {
  return [...state, toAdd];
}

class Client {
  public listener?: (message: string) => void;
  public count = 1;

  private intervalId: number;

  constructor() {
    this.intervalId = setInterval(() => this.listener?.(`Random message #${this.count++}`), 5000) as any; // fuck node js
  }

  addEventListener(_event: "message", listener: (message: string) => void) {
    this.listener = listener;
  }

  stop() {
    clearInterval(this.intervalId);
  }
}

function App() {
  const [messages, addMessage] = useReducer(reducer, []);

  useEffect(() => {
    const client = new Client();

    client.addEventListener("message", addMessage);

    return () => client.stop();
  }, []);

  return <ChatWindow messages={messages} onAddMessage={addMessage} />;
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
