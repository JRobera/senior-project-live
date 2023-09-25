import React, { useContext } from "react";
import "./Avatar.css";
import { AppContext } from "../context/AppContexts";

const avatarstyle = [
  "avatar avatar-small",
  "avatar avatar-medium",
  "avatar avatar-large",
];

function Avatar(props) {
  return (
    <img
      className={avatarstyle[props.avatarsize]}
      src={props.src && props.src}
      alt="user avatar"
    />
  );
}

export default Avatar;
