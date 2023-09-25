import React, { useContext, useEffect, useState } from "react";
import "./MyChat.css";
import ChatAvatar from "./ChatAvatar";
import axios from "axios";
import { AppContext } from "../../../context/AppContexts";

function MyChat({ socket, selectedC, searchchat }) {
  const { user, room, setRoom, messageList, setMessageList } =
    useContext(AppContext);
  const [currentChat, setCurrentChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [foundChat, setFoundChat] = useState(chats);
  const [lastMessage, setLastMessage] = useState();

  useEffect(() => {
    const currentUser = user.u_id;
    // console.log(user.u_id);
    if (currentUser) {
      axios
        .get(
          `https://senior-project-live-api.onrender.com/my-chats/${currentUser}`
        )
        .then(({ data }) => {
          setChats(data);
          // console.log(data);
        });
    }
  }, [user]);

  // update the room immediately
  useEffect(() => {
    if (room) {
      // console.log(room);
      axios
        .get(`http://127.0.0.1:3005/get-message-id/${room}`)
        .then((response) => {
          // console.log(response.data);
          if (response.data == null) {
            // setMessageList([]);
            axios
              .post(`http://127.0.0.1:3005/create-room/${room}`)
              .then((response) => {
                console.log("New room created");
              });
            socket.emit("join_room", room);
          } else {
            // console.log("Room already exists " + room);
            socket.emit("join_room", room);
            axios
              .get(`http://127.0.0.1:3005/get-chat/${room}`)
              .then((response) => {
                setMessageList([]);
                setMessageList(response.data?.Message_content);
                setLastMessage(
                  response.data?.Message_content[
                    response.data?.Message_content.length - 1
                  ]?.message
                );
              });
          }
        });
    } else {
      console.log("room not set");
    }
  }, [room]);

  function handleJoinRoom(chat_id) {
    let owner_id = user?.u_id;
    // setRoom(chat_id + "--" + owner_id);
    axios
      .get(
        `http://127.0.0.1:3005/get-all-message-id/${chat_id + "--" + owner_id}`
      )
      .then((response) => {
        // console.log(response.data !== 0);
        if (response.data.length !== 0) {
          const temproom = (chat_id + "--" + owner_id)
            .split("--")
            .reverse()
            .join("--");
          // console.log("im working " + JSON.stringify(response.data));
          //
          response.data.some((e) => {
            if (e.Message_id === temproom) {
              setRoom(temproom);
              // console.log(e);
              // console.log("I used tem: " + temproom);
              return true;
            } else if (e.Message_id === chat_id + "--" + owner_id) {
              setRoom(chat_id + "--" + owner_id);
              // console.log("I use org: " + chat_id + "--" + owner_id);
              return true;
            } else {
              setRoom(chat_id + "--" + owner_id);
              return false;
            }
          });
          // for (let i = 0; i < response.data.length; i++) {
          //   if (response.data[i].Message_id.includes(temproom)) {
          //     console.log("I used tem: " + temproom);
          //     setRoom(temproom);
          //     // socket.join(temproom);
          //     break;
          //   } else if (
          //     response.data[i].Message_id.includes(chat_id + "--" + owner_id)
          //   ) {
          //     console.log("I use org: " + chat_id + "--" + owner_id);
          //     setRoom(chat_id + "--" + owner_id);
          //     // socket.join(chat_id + "--" + owner_id);
          //     break;
          //   }
          // }
        } else {
          // console.log("empty");
          setRoom(chat_id + "--" + owner_id);
        }
      });
    // console.log(room);
  }
  // load all users
  useEffect(() => {
    setFoundChat(chats);
  }, [chats]);

  // const cchats = ["Abera Mola", "Brandon Wilson", "Dariene Black"];
  const search = () => {
    if (searchchat !== "") {
      const results = chats.filter((chat) => {
        return chat.Name.toLowerCase().startsWith(searchchat.toLowerCase());
      });
      setFoundChat(results);
    } else {
      setFoundChat(chats);
    }
  };
  useEffect(() => {
    search();
  }, [searchchat]);
  //
  // console.log(foundChat);

  return (
    <>
      {foundChat && foundChat.length > 0 ? (
        foundChat.map((chat, i) => {
          // console.log(chat.id);
          return (
            <div
              key={chat._id}
              className={`my-chat ${
                currentChat === chat.Email ? "active-chat" : undefined
              }`}
              onClick={() => {
                setCurrentChat(chat.Email);
                selectedC(chat.Name);
                handleJoinRoom(chat._id);
              }}
            >
              <div>
                <ChatAvatar cimg={chat.Picture} />
                <div className="last-chat">
                  <p className="name">{chat.Name}</p>
                  {/* <p className="last-chat-content">{lastMessage}</p> */}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <center>No chat found</center>
      )}
    </>
  );
}

export default MyChat;
