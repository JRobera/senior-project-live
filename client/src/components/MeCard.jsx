import React, { useContext } from "react";
import "./MeCard.css";
import LanguageSelector from "./LanguageTranslater/LanguageSelector";
import Friends from "./jobseekercomponents/profilepagecomponents/Friends";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContexts";
import axios from "axios";
import Avatar from "./Avatar";

function MeCard() {
  const { content, user, setUser } = useContext(AppContext);

  let history = useNavigate();

  const redirect = () => {
    history("/");
  };
  return (
    <div className="card">
      <div className="me-wrapper">
        <Avatar src={user?.u_pic} avatarsize="1" />
        <div className="me-info">
          <p className="name">{user?.u_name}</p>
          <p className="title">{user?.u_title}</p>
        </div>
      </div>
      {/* <Friends src={user?.u_pic} name={user?.u_name} title={user?.u_title} /> */}
      <Link to="/profile">
        <span>{content.viewprofile}</span>
      </Link>
      <hr />
      <LanguageSelector />
      <hr />
      <p
        className="sign-out"
        onClick={() => {
          axios
            .post(
              "https://senior-project-live-api.onrender.com/user/logout",
              {},
              { withCredentials: true }
            )
            .then((r) => {
              console.log(r);
            });
          setUser({});
          redirect();
        }}
      >
        {content.signout}
      </p>
    </div>
  );
}

export default MeCard;
