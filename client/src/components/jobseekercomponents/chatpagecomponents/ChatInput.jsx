import React, { useContext } from "react";
import { AppContext } from "../../context/AppContexts";

function ChatInput({ handleChange }) {
  const { user } = useContext(AppContext);

  return (
    <form>
      <textarea
        rows="1"
        type="text"
        placeholder="Write your message"
        value={message}
        onChange={(e) => {
          handleChange(e);
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
        <input type="file" id="attach-file" hidden />
        <label htmlFor="attach-file">
          <ImAttachment />
        </label>
      </div>

      <button
        onClick={async (e) => {
          e.preventDefault();
          if (message !== "" && room !== "") {
            const newmessage = {
              room: room,
              author: user.user._id,
              message: message,
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            };
            await socket.emit("send_message", newmessage);
            setMessageList((list) => [...list, newmessage]);
            axios
              .put(`http://127.0.0.1:3005/update-chat`, messageList)
              .then((response) => {});
            console.log(messageList);
            setMessage("");
          } else {
            console.log("empty room or message");
          }
        }}
      >
        <BsSend />
      </button>
    </form>
  );
}

export default ChatInput;
