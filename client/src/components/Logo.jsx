import React from "react";
import { Link } from "react-router-dom";
import "./Logo.css";
const logostyle = ["nav-logo", "footer-logo"];
function Logo(props) {
  return (
    <Link to="/feed">
      <img
        className={logostyle[props.logostyle]}
        src="../images/Logo.png"
        alt=""
      />
    </Link>
  );
}

export default Logo;
