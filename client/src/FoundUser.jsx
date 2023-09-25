import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileContainer from "./components/jobseekercomponents/profilepagecomponents/ProfileContainer";
import TopProfileContainer from "./components/jobseekercomponents/profilepagecomponents/TopContainer";
import Tabs from "./components/jobseekercomponents/profilepagecomponents/Tabs";
import About from "./components/jobseekercomponents/profilepagecomponents/About";
import Skills from "./components/jobseekercomponents/profilepagecomponents/Skills";
import Experience from "./components/jobseekercomponents/profilepagecomponents/Experience";
import Education from "./components/jobseekercomponents/profilepagecomponents/Education";
import Certification from "./components/jobseekercomponents/profilepagecomponents/Certification";
import MyPost from "./components/jobseekercomponents/profilepagecomponents/MyPost";
import MyArticle from "./components/jobseekercomponents/profilepagecomponents/MyArticle";
import Navigation from "./components/Navigation";
import ENavigation from "./components/employerpagecomponents/ENavigation";
import { AppContext } from "./context/AppContexts";

function FoundUser() {
  const [foundUser, setFoundUser] = useState();
  const { content, user } = useContext(AppContext);
  const params = useParams();

  const [selectedTab, setSelectedTab] = useState();
  const [data, setData] = useState();

  const handleSelectedTab = (tab) => {
    setSelectedTab(tab);
    // console.log(tab);
  };
  const handlePost = () => {
    axios
      .get(`http://127.0.0.1:3005/post/${foundUser._id}`)
      .then((response) => {
        setData(response.data.Post_id);
        // console.log(response.data.Post_id);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const handleArticle = () => {
    axios
      .get(`http://127.0.0.1:3005/article/${foundUser._id}`)
      .then((response) => {
        // console.log(response.data.Article_id);
        setData(response.data.Article_id);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  function handleProfileEditRefresh() {
    axios
      .get(
        `https://senior-project-live-api.onrender.com/get-user-profile/${user?.u_id}`
      )
      .then((response) => {
        setFoundUser(response.data);
        // console.log(response.data);
      });
  }

  //
  useEffect(() => {
    axios
      .get(
        `https://senior-project-live-api.onrender.com/found/user/${params.id}`
      )
      .then((response) => {
        setFoundUser(response.data);
      });
  }, [params.id]);
  //
  useEffect(() => {
    // console.log(foundUser);
  }, [foundUser]);
  // console.log(user);
  return (
    <>
      {user?.u_isemployer ? <ENavigation /> : <Navigation />}
      <div className="wrapper found-user">
        <div className="details">
          <TopProfileContainer
            fuser={foundUser}
            handleProfileEditRefresh={handleProfileEditRefresh}
          />
          <Tabs
            handleSelectedTab={handleSelectedTab}
            handlePost={handlePost}
            handleArticle={handleArticle}
            user={foundUser}
          />
          {selectedTab === `${content.profile}` ? (
            <>
              <About about={foundUser?.About} />
              {foundUser?.Skill_id.length !== 0 && (
                <Skills skills={foundUser?.Skill_id} />
              )}

              {foundUser?.Experience_id.length !== 0 && (
                <Experience
                  experiences={foundUser?.Experience_id}
                  img={foundUser?.Picture}
                />
              )}
              {foundUser?.Education_id.length !== 0 && (
                <Education
                  educations={foundUser?.Education_id}
                  img={foundUser?.Picture}
                />
              )}
              {foundUser?.Certification_id.length !== 0 && (
                <Certification
                  certifications={foundUser?.Certification_id}
                  img={foundUser?.Picture}
                />
              )}
            </>
          ) : selectedTab === `${content.post}` ? (
            data?.map((post) => {
              return <MyPost key={post._id} post={post} />;
            })
          ) : (
            selectedTab === `${content.article}` && (
              <div className="ql-editor">
                {data?.map((article) => {
                  // console.log(article.Article_content);
                  return (
                    <MyArticle
                      key={article?._id}
                      name={foundUser?.u_name}
                      description={foundUser?.u_title}
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
    </>
  );
}

export default FoundUser;
