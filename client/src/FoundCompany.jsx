import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TopProfileContainer from "./components/employerpagecomponents/profilepagecomponents/TopContainer";
import Tabs from "./components/employerpagecomponents/profilepagecomponents/Tabs";
import MyPost from "./components/employerpagecomponents/profilepagecomponents/MyPost";
import MyArticle from "./components/employerpagecomponents/profilepagecomponents/MyArticle";
import Navigation from "./components/Navigation";
import ENavigation from "./components/employerpagecomponents/ENavigation";
import { AppContext } from "./context/AppContexts";
import JobItems from "./components/employerpagecomponents/profilepagecomponents/JobItems";
import About from "./components/employerpagecomponents/profilepagecomponents/About";
import Certification from "./components/employerpagecomponents/profilepagecomponents/Certification";

function FoundCompany() {
  const [foundUser, setFoundUser] = useState();
  const { content, user } = useContext(AppContext);
  const params = useParams();

  const [selectedTab, setSelectedTab] = useState();
  const [data, setData] = useState();

  const handleSelectedTab = (tab) => {
    setSelectedTab(tab);
  };
  const handlePost = () => {
    axios
      .get(`http://127.0.0.1:3005/post/${foundUser._id}`)
      .then((response) => {
        setData(response.data.Post_id);
        console.log(response.data.Post_id);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const handleArticle = (data) => {
    setData(data);
  };

  const handleJobPost = () => {
    axios
      .get(`http://127.0.0.1:3005/my-jobs/${foundUser._id}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  function handleProfileEditRefresh() {
    axios
      .get(`http://localhost:3005/get-user-profile/${user?.u_id}`)
      .then((response) => {
        setFoundUser(response.data);
        // console.log(response.data);
      });
  }

  //
  useEffect(() => {
    axios
      .get(`http://localhost:3005/found/employer/${params.id}`)
      .then((response) => {
        setFoundUser(response.data);
      });
  }, [params?.id]);
  //
  useEffect(() => {
    // console.log(foundUser);
  }, [foundUser]);
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
            handleJobPost={handleJobPost}
            handlePost={handlePost}
            handleArticle={handleArticle}
            user={foundUser}
          />
          {selectedTab === `${content.profile}` ? (
            <>
              <About about={foundUser?.About} />
              {foundUser?.Certification_id.lenght !== 0 && (
                <Certification certifications={foundUser?.Certification_id} />
              )}
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
              return <MyPost key={post.Post_id} post={post} />;
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

export default FoundCompany;
