import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
export default function Chat(props) {
  const { socket, username, room } = props;
  const [currentMsg, setCurrentMsg] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  const sendMsg = async () => {
    if (currentMsg !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMsg,
        time:
          new Date(Date.now()).getHours().toString().padStart(2, "0") +
          ":" +
          new Date(Date.now()).getMinutes().toString().padStart(2, "0"),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMsg("");
    }
  };
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, index) => (
            <div
              key={index}
              className="message"
              id={username === messageContent.author ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p> &nbsp;
                  <p id="author">{messageContent.author}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          autoFocus
          value={currentMsg}
          type="text"
          placeholder="Type something..."
          onChange={(e) => setCurrentMsg(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMsg()}
        />
        <button onClick={sendMsg}> &#9658; </button>
      </div>
    </div>
  );
}
