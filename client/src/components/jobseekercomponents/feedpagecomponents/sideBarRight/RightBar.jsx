import React, { useContext, useEffect, useState } from "react";
import Avatar from "../../../Avatar";
import "./rightbar.css";
import { AppContext } from "../../../../context/AppContexts";
import { Link } from "react-router-dom";
import axios from "axios";

function Sidebar() {
  const { content, user } = useContext(AppContext);
  const [trandArticle, setTrandArticle] = useState();
  const [userSideBar, setUserSideBar] = useState();

  function getArticle() {
    axios
      .get("https://senior-project-live-api.onrender.com/latest/article")
      .then((response) => {
        setTrandArticle(response.data);
      });
  }

  function getUser() {
    axios
      .get(
        `https://senior-project-live-api.onrender.com/get-user-by-email/${user.u_email}`
      )
      .then((response) => {
        setUserSideBar(response.data);
        // console.log(userSideBar);
      });
  }
  useEffect(() => {
    getUser();
    getArticle();
  }, [user]);

  return (
    <div className="right-bar">
      <div className="sidebar-top">
        <img src={userSideBar?.Profile_bg} alt="" />
        <Link to="/profile">
          <Avatar avatarsize="1" src={userSideBar?.Picture} />
          <h4>{userSideBar?.Name}</h4>
        </Link>
        <p>{userSideBar?.About}</p>
      </div>
      <div className="sidebar-bottom">
        <p>{content.latestarticle}</p>
        <div className="sidbar-article-data">
          {trandArticle?.map((article) => {
            return (
              <div key={article._id} className="article-data-container">
                <Avatar avatarsize="1" src={article?.User_id?.Picture} />
                {/* <img src={article?.User_id?.Picture} alt="" /> */}
                <div className="article-detail">
                  <span className="article-title">
                    {article?.Article_title}
                  </span>
                  <Link to={"/article/" + article._id}>
                    <span className="read-more">{content.readmore}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
