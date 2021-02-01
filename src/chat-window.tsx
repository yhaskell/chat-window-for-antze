import React, { useCallback, useRef, useState } from "react";

interface ChatWindowProps {
  messages: string[];

  onAddMessage(message: string): void;
}

export default function ChatWindow({ messages, onAddMessage }: ChatWindowProps) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const handleSend = useCallback(() => {
    onAddMessage(value);
    setValue("");

    setTimeout(() => ref.current?.scrollTo(0, 9999999), 50);
  }, [onAddMessage, value]);

  return <div className="wrapper">
    <div ref={ref} className="chat-window">
      {messages.map(message => <p>{message}</p>)}
    </div>
    <input className="input" value={value} onChange={e => setValue(e.target.value)} onKeyUp={e => { if (e.keyCode === 13) handleSend(); }} />
    <button onClick={handleSend}>Send</button>
  </div>;
}