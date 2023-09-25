import React from "react";
import ChatAvatar from "./ChatAvatar";
import "./Message.css";

function Message(props) {
  return (
    <div className={"message-wrapper " + props.wrapper}>
      <div>
        <ChatAvatar />
        <div className={"message " + props.user}>{props.content}</div>
      </div>
      <span className="chat-time">{props.timestap}</span>
    </div>
  );
}

export default Message;
