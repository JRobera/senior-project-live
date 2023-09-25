import React, { useContext } from "react";
import "./ChatAvatar.css";
import { AppContext } from "../../../context/AppContexts";

function ChatAvatar({ cimg }) {
  const { user } = useContext(AppContext);
  return <img className="chat-avatar" src={cimg} alt="" />;
}

export default ChatAvatar;
