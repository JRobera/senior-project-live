import React, { useContext, useEffect, useState } from "react";
import "./AddFriends.css";
import Friends from "./Friends";
import { AppContext } from "../../../context/AppContexts";
import axios from "axios";
import { generateError } from "../../../utility/Toasts";

function AddFriends() {
  const { content, user } = useContext(AppContext);
  const [networkUsers, setNetworkUsers] = useState();

  function handleUnfollowedUsers() {
    axios
      .get(
        `https://senior-project-live-api.onrender.com/get/new/network/${user?.u_id}`
      )
      .then((response) => {
        // console.log(response.data);
        setNetworkUsers(response.data);
      })
      .catch((err) => {
        generateError(err);
      });
  }

  useEffect(() => {
    handleUnfollowedUsers();
  }, []);

  return (
    <div className="add-friends-wrapper">
      <div className="add-friends-top-taps">
        <p>{content.addfriends}</p>
        {/* <p
          onClick={() => {
            console.log("view all friends");
          }}
        >
          VIEW ALL
        </p> */}
      </div>
      <div className="friends">
        {networkUsers?.map((nuser) => {
          return (
            <Friends
              key={nuser._id}
              newFollow={nuser._id}
              currentUser={user.u_id}
              name={nuser.Name}
              title={nuser.Job_title}
              src={nuser.Picture}
              handleUnfollowedUsers={handleUnfollowedUsers}
            />
          );
        })}

        {/* <Friends name="Oscar Jordan" title="Unknown" src={user?.u_pic} />
        <Friends name="Joe West" title="Unknown" src={user?.u_pic} /> */}
      </div>
    </div>
  );
}

export default AddFriends;
