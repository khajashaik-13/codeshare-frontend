// @ts-nocheck
import { Editor } from "@monaco-editor/react";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const App = () => {
  const [message, setMessage] = useState("");
  // const socket = io("http://localhost:3000");
  const socket = io("https://codeshare-backend-teal.vercel.app/", {
    withCredentials: true,
    transports: ['websocket', 'polling']
  });
  const debounceTimer = useRef(null);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function getMessages(value) {
      setMessage(value)
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("chat message", getMessages);

    socket.emit("joinRoom", window.location.pathname);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  function sendMessage(value) {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      socket.emit("chat message", value, window.location.pathname);
    }, 1000);
  }

  const options = {
    minimap: { enabled: false },
  };

  return (
    <>
      <div style={{padding: "4px"}}>
        <Editor
          height="100vh"
          width="100vw"
          theme="vs-dark"
          options={options}
          value={message}
          onChange={sendMessage}
        />
      </div>
    </>
  );
};

export default App;
