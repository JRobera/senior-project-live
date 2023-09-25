import React, { useContext } from "react";
import Avatar from "../../Avatar";
import "./FollowCard.css";
import axios from "axios";
import { AppContext } from "../../../context/AppContexts";

function FollowCard({
  newFollow,
  currentUser,
  pic,
  name,
  title,
  about,
  handleUnfollowedUsers,
}) {
  const { content } = useContext(AppContext);
  function hanldleFollow() {
    axios
      .patch(`http://localhost:3005/follow/user`, {
        poster_id: newFollow,
        user_id: currentUser,
      })
      .then((response) => {
        console.log(response.data);
        handleUnfollowedUsers();
      });
  }
  return (
    <div className="card-wrapper">
      <div className="card-detail">
        <Avatar avatarsize={1} src={pic} />
        <div className="card-user-detail">
          <p>{name}</p>
          <p>{title}</p>
        </div>
      </div>
      <div className="card-summery">{about}</div>
      <button className="btn-card-follow" onClick={hanldleFollow}>
        {content.follow}
      </button>
    </div>
  );
}

export default FollowCard;
