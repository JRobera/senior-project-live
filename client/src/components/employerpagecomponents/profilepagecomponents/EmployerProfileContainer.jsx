import React, { useContext, useEffect, useState } from "react";
import "./EmployerProfileContainer.css";
import "react-quill/dist/quill.core.css";
import About from "./About";
import Certification from "./Certification";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";
import Tabs from "./Tabs";
import AddFriends from "./AddFriends";
import TopProfileContainer from "./TopContainer";
import ENavigation from "../ENavigation";
// import EditProfile from "./EditProfile";
// import Post from "../feedpagecomponents/feed/Post";
import MyArticle from "./MyArticle";
import { AppContext } from "../../../context/AppContexts";
import MyPost from "./MyPost";
import Footer from "../../Footer";
import axios from "axios";
import JobItems from "./JobItems";

function EmployerProfileContainer() {
  const [selectedTab, setSelectedTab] = useState();
  const [data, setData] = useState();
  const { content, user } = useContext(AppContext);
  const [upUser, setUpUser] = useState();

  function handleProfileEditRefresh() {
    axios
      .get(
        `https://senior-project-live-api.onrender.com/get-user-profile/${user?.u_id}`
      )
      .then((response) => {
        setUpUser(response.data);
        // console.log(response.data);
      });
  }

  useEffect(() => {
    axios
      .get(
        `https://senior-project-live-api.onrender.com/get-user-profile/${user?.u_id}`
      )
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
  const handleJobPost = () => {
    axios
      .get(`http://127.0.0.1:3005/my-jobs/${user.u_id}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <>
      <ENavigation />
      <div className="wrapper">
        <AddFriends />
        <div className="details">
          <TopProfileContainer
            fuser={upUser}
            handleProfileEditRefresh={handleProfileEditRefresh}
          />
          <Tabs
            handleSelectedTab={handleSelectedTab}
            handleJobPost={handleJobPost}
            handlePost={handlePost}
            handleArticle={handleArticle}
            user={upUser}
          />
          {selectedTab === `${content.profile}` ? (
            <>
              <About about={upUser?.About} />
              {upUser?.Certification_id.lenght !== 0 ? (
                <Certification certifications={upUser?.Certification_id} />
              ) : null}
            </>
          ) : selectedTab === `${content.myjobs}` ? (
            <div className="job-flex">
              {data?.map((job) => {
                console.log(job?.Applicants);
                return (
                  <JobItems
                    key={job?._id}
                    postid={job?._id}
                    userid={user?.u_id}
                    companyname={job?.Company_name}
                    userimg={job?.Company_id?.Picture}
                    jobtitle={job?.Job_title}
                    employmenttype={job?.Employment_type}
                    worktype={job?.Work_type}
                    skills={job?.Skills}
                    handleJobPost={handleJobPost}
                  />
                );
              })}
            </div>
          ) : selectedTab === `${content.post}` ? (
            data?.map((post) => {
              return (
                <MyPost
                  key={post?._id}
                  post={post}
                  userid={user?.u_id}
                  handlePost={handlePost}
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

export default EmployerProfileContainer;
