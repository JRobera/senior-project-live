import React, { useContext } from "react";
import "./EMeCard.css";
import LanguageSelector from "../LanguageTranslater/LanguageSelector";
import Friends from "../jobseekercomponents/profilepagecomponents/Friends";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContexts";
import axios from "axios";
import Avatar from "../Avatar";

function EMeCard() {
  const { content, user, setEmployer } = useContext(AppContext);

  let history = useNavigate();

  const redirect = () => {
    history("/emp/home");
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
      <Link to="/emp/profile">
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
              "http://localhost:3005/employer/logout",
              {},
              { withCredentials: true }
            )
            .then((r) => {
              console.log(r);
            });
          setEmployer({});
          redirect();
        }}
      >
        {content.signout}
      </p>
    </div>
  );
}

export default EMeCard;
