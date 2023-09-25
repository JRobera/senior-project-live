import React, { useContext, useEffect, useRef, useState } from "react";
import "./Navigation.css";
import Logo from "./Logo";
import NavIcon from "./NavIcon";
import Avatar from "./Avatar";
import Search from "./Search";
import MeCard from "./MeCard";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContexts";

import { SlFeed } from "react-icons/sl";
import RssFeedOutlinedIcon from "@mui/icons-material/RssFeedOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { MdPeopleOutline, MdWorkOutline } from "react-icons/md";
import { BsChatLeft } from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";
import MenuIcon from "./MenuIcon";

function Navigation() {
  const [showme, setShowMe] = useState(false);
  const [showmenu, setShowMenu] = useState(false);

  const { user, content } = useContext(AppContext);
  // useEffect(() => {
  //   console.log("log from " + user);
  // }, []);
  const btnMe = useRef();
  // useEffect(() => {
  //   const closeDropdown = (e) => {
  //     if (btnMe.current && !btnMe.current.contains(e.target)) {
  //       setShowMe(false);
  //     }
  //   };

  //   document.addEventListener("click", closeDropdown);
  //   return () => {
  //     document.removeEventListener("click", closeDropdown);
  //   };
  // }, []);
  // console.log(user);

  return (
    <nav className={showmenu ? "show-menu" : 0}>
      <div
        className="menu-flex"
        onClick={() => {
          setShowMenu(!showmenu);
        }}
      >
        <Logo logostyle="0" />
        <MenuIcon />
      </div>
      <div className="nav-icons">
        <Link to="/feed">
          <NavIcon
            icon={<RssFeedOutlinedIcon size="1.2rem" />}
            iconName={content.feed}
          />
        </Link>
        <Link to="/network">
          <NavIcon
            icon={<PeopleAltOutlinedIcon size="1.2rem" />}
            iconName={content.network}
          />
        </Link>
        <Link to="/jobs">
          <NavIcon
            icon={<BusinessCenterOutlinedIcon size="1.2rem" />}
            iconName={content.jobs}
          />
        </Link>
        <Link to="/chat">
          <NavIcon
            icon={<ChatBubbleOutlineOutlinedIcon size="1.2rem" />}
            iconName={content.chat}
          />
        </Link>
        {/* <Link to="/notification">
          <NavIcon
            icon={<NotificationsNoneOutlinedIcon size="1.2rem" />}
            iconName={content.notification}
          />
        </Link> */}
      </div>
      <Search />
      <div className="me">
        <div
          className="inner-me"
          ref={btnMe}
          onClick={() => setShowMe(!showme)}
        >
          <Avatar avatarsize="0" src={user?.u_pic} />
          <p>
            {content.me}
            <img src="../images/Chevron.png" alt="chevron" />
          </p>
        </div>
        {showme && <MeCard />}
      </div>
    </nav>
  );
}

export default Navigation;
