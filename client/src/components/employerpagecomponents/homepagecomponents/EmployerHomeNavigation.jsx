import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./EmployerHomeNavigation.css";
import Logo from "../../Logo";
import NavIcon from "../../NavIcon";
import BtnCustome from "./EmployerBtnCustome";
import { AppContext } from "../../../context/AppContexts";

import { MdWorkOutline } from "react-icons/md";

function EmployerHomeNavigation() {
  const { content } = useContext(AppContext);
  return (
    <nav className="home-page-nav">
      <Logo logostyle="0" />
      <div className="nav-icons"></div>
      <div className="home-nav-btn">
        <BtnCustome path="/" name={content.jobseeker} btnstyle="2" />
        <BtnCustome path="/emp/signin" name={content.signin} btnstyle="0" />
      </div>
    </nav>
  );
}

export default EmployerHomeNavigation;
