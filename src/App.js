import "./App.css";
import io from "socket.io-client";
import React, { useState } from "react";
import Chat from "./components/Chat";
const socket = io.connect("http://localhost:8000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    } else {
      alert("Please enter username and room number!");
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h2>React Chat App</h2>
          <h3>Join a chat</h3>
          <input
            type="text"
            placeholder="Your name..."
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room ID"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room}></Chat>
      )}
    </div>
  );
}

export default App;
