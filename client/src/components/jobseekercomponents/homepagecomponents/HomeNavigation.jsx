import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./HomeNavigation.css";
import Logo from "../../Logo";
import NavIcon from "../../NavIcon";
import BtnCustome from "./BtnCustome";
import { AppContext } from "../../../context/AppContexts";

import { MdWorkOutline } from "react-icons/md";

function HomeNavigation() {
  const { content } = useContext(AppContext);
  return (
    <nav className="home-page-nav">
      <Logo logostyle="0" />
      <div className="nav-icons">
        {/* <Link to="/people">
          <NavIcon icon="./images/Network.png" iconName={content.people} />
        </Link>
        <Link to="/jobs">
          <NavIcon
            icon={<MdWorkOutline size="1.2rem" />}
            iconName={content.jobs}
          />
        </Link> */}
      </div>
      <div className="home-nav-btn">
        <BtnCustome path="/emp/home" name={content.employer} btnstyle="2" />
        <BtnCustome path="/signin" name={content.signin} btnstyle="0" />
      </div>
    </nav>
  );
}

export default HomeNavigation;
