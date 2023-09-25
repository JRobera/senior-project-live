import React, { useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
// import ScrollToBottom from "react-scroll-to-bottom";

import ENavigation from "../ENavigation";
// import ChatAvatar from "./ChatAvatar";
import "./EmployerChatContainer.css";
import Message from "./Message";
import EmployerMyChat from "./EmployerMyChat";

import { ImAttachment } from "react-icons/im";
import { BsSend } from "react-icons/bs";
import { AppContext } from "../../../context/AppContexts";
import axios from "axios";
import ChatImage from "./ChatImage";

const socket = io.connect("https://senior-project-live-api.onrender.com");

function EmployerChatContainer() {
  const { user, room, messageList, setMessageList } = useContext(AppContext);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState();
  const [selectedChat, setSelectedChat] = useState("");
  const [searchchat, setSearchchat] = useState("");

  function handleSelectedChat(chat) {
    setSelectedChat(chat);
  }
  function handleChange(e) {
    setMessage(e.target.value);
  }
  function selectFile(e) {
    console.log(e.target.files);

    setMessage(e.target.files[0]?.name);
    setFile(e.target.files[0]);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (file && room !== "") {
      const newmessage = {
        room: room,
        type: "file",
        author: user?.u_id,
        message: file,
        mimeType: file.type,
        fileName: file.name,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessageList((list) => [...list, newmessage]);
      socket.emit("send_message", newmessage);
      axios
        .put(
          `https://senior-project-live-api.onrender.com/update-chat/${room}`,
          messageList
        )
        .then((response) => {});
      // console.log(messageList);
      setMessage("");
      setFile();
    } else if (message !== "" && room !== "") {
      const newmessage = {
        room: room,
        type: "text",
        author: user?.u_id,
        message: message,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessageList((list) => [...list, newmessage]);
      socket.emit("send_message", newmessage);
    } else {
      console.log("empty room or message");
    }
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  const messageRef = useRef();
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
    // setMessageList(messageList);
  }, [messageList]);

  // update message list immediately and save to DB
  useEffect(() => {
    // console.log(messageList);
    if (room) {
      axios
        .put(
          `https://senior-project-live-api.onrender.com/update-chat/${room}`,
          messageList
        )
        .then((response) => {});
      // console.log(messageList);
      setMessage("");
    }
  }, [messageList]);

  function handleChatChange(e) {
    const { value } = e.target;
    setSearchchat(value);
  }

  return (
    <>
      <ENavigation />

      <div className="chat-page-wrapper">
        <div className="chats-wrapper">
          <div className="chats">
            <p className="chats-header">
              <span>CHATS</span>
              <input
                className="chat-search"
                type="search"
                value={searchchat}
                onChange={handleChatChange}
                placeholder="search"
              />
            </p>
            <EmployerMyChat
              socket={socket}
              searchchat={searchchat}
              selectedC={handleSelectedChat}
            />
          </div>
          {/* <div className="new-chats">
            <p>START NEW CHAT</p>
          </div> */}
        </div>

        <div className="chat-wrapper">
          <div className="chat-header">
            <p>Chat with {selectedChat}</p>
          </div>

          <div className="chat-window">
            {messageList?.map((messageContent, index) => {
              if (messageContent.type === "file") {
                const blob = new Blob([messageContent.message], {
                  type: messageContent.type,
                });
                return (
                  <ChatImage blob={blob} fileName={messageContent.fileName} />
                );
              } else {
                return (
                  <Message
                    key={index}
                    content={messageContent.message}
                    timestap={messageContent.time}
                    wrapper={
                      user?.u_id === messageContent.author
                        ? "message-wrapper-you"
                        : "message-wrapper-chat"
                    }
                    user={
                      user?.u_id === messageContent.author
                        ? "you-message"
                        : "chat-message"
                    }
                  />
                );
              }
            })}
            <div ref={messageRef} />
          </div>

          <form>
            <textarea
              rows="1"
              type="text"
              placeholder="Write your message"
              value={message}
              onChange={handleChange}
              onInput={(e) => {
                e.target.rows = e.target.value.split("\n").length;
              }}
              // onKeyUp={(e) => {
              //   e.key === "Enter" && handleChange(e);
              // }}
            />
            <div
              className="attach-file"
              onClick={() => {
                console.log("attach");
              }}
            >
              <input
                type="file"
                id="attach-file"
                onChange={selectFile}
                hidden
              />
              <label htmlFor="attach-file">
                <ImAttachment />
              </label>
            </div>

            <button onClick={handleSubmit}>
              <BsSend />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EmployerChatContainer;
