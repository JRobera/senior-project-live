import React from "react";
import Avatar from "../../Avatar";
import "./Friends.css";
import axios from "axios";
import { GrAdd } from "react-icons/gr";

function Friends(props) {
  function hanldleFollow() {
    axios
      .patch(`https://senior-project-live-api.onrender.com/follow/user`, {
        poster_id: props.newFollow,
        user_id: props.currentUser,
      })
      .then((response) => {
        console.log(response.data);
        props.handleUnfollowedUsers();
      });
  }
  return (
    <div className="friends-wrapper">
      <div>
        <Avatar src={props.src} avatarsize="1" />
        <div className="friend-info">
          <p className="name">{props.name}</p>
          <p className="title">{props.title}</p>
        </div>
      </div>
      <GrAdd size={"1rem"} onClick={hanldleFollow} />
    </div>
  );
}

export default Friends;
