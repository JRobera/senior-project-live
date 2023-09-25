import React, { useContext, useEffect, useState } from "react";
import "./ProfileContainer.css";
import "react-quill/dist/quill.core.css";
import About from "./About";
import Certification from "./Certification";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";
import Tabs from "./Tabs";
import AddFriends from "./AddFriends";
import TopProfileContainer from "./TopContainer";
import Navigation from "../../Navigation";
// import EditProfile from "./EditProfile";
// import Post from "../feedpagecomponents/feed/Post";
import MyArticle from "./MyArticle";
import { AppContext } from "../../../context/AppContexts";
import MyPost from "./MyPost";
import Footer from "../../Footer";
import axios from "axios";

function ProfileContainer() {
  const [selectedTab, setSelectedTab] = useState();
  const [data, setData] = useState();
  const { content, user } = useContext(AppContext);
  const [upUser, setUpUser] = useState();

  function handleProfileEditRefresh() {
    axios
      .get(`http://localhost:3005/get-user-profile/${user?.u_id}`)
      .then((response) => {
        setUpUser(response.data);
        // console.log(response.data);
      });
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3005/get-user-profile/${user?.u_id}`)
      .then((response) => {
        setUpUser(response.data);
        // console.log(response.data);
      });
  }, [user]);

  const handleSelectedTab = (tab) => {
    setSelectedTab(tab);
  };
  const handlePost = () => {
    axios
      .get(`http://127.0.0.1:3005/post/${user.u_id}`)
      .then((response) => {
        setData(response.data.Post_id);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const handleArticle = () => {
    axios
      .get(`http://127.0.0.1:3005/article/${user.u_id}`)
      .then((response) => {
        // console.log(response.data.Article_id);
        setData(response.data.Article_id);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <>
      <Navigation />
      <div className="wrapper">
        <AddFriends />
        <div className="details">
          <TopProfileContainer
            fuser={upUser}
            handleProfileEditRefresh={handleProfileEditRefresh}
          />
          <Tabs
            handleSelectedTab={handleSelectedTab}
            handlePost={handlePost}
            handleArticle={handleArticle}
            user={upUser}
          />
          {selectedTab === `${content.profile}` ? (
            <>
              <About about={upUser?.About} />
              {upUser?.Skill_id.length !== 0 && (
                <Skills skills={upUser?.Skill_id} />
              )}
              {upUser?.Experience_id.length !== 0 ? (
                <Experience
                  experiences={upUser?.Experience_id}
                  img={upUser?.Picture}
                />
              ) : null}
              {upUser?.Education_id.length !== 0 && (
                <Education
                  educations={upUser?.Education_id}
                  img={upUser?.Picture}
                />
              )}
              {upUser?.Certification_id.length !== 0 && (
                <Certification
                  certifications={upUser?.Certification_id}
                  img={upUser?.Picture}
                />
              )}
            </>
          ) : selectedTab === `${content.post}` ? (
            data?.map((post) => {
              return (
                <MyPost
                  key={post?._id}
                  post={post}
                  handlePost={handlePost}
                  userid={user?.u_id}
                />
              );
            })
          ) : (
            selectedTab === `${content.article}` && (
              <div className="ql-editor">
                {data?.map((article) => {
                  return (
                    <MyArticle
                      key={article?._id}
                      name={user?.u_name}
                      description={user?.u_title}
                      message={article?.Article_content}
                      id={article?._id}
                      userid={user?.u_id}
                      handleArticle={handleArticle}
                    />
                  );
                })}
              </div>
            )
          )}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default ProfileContainer;
