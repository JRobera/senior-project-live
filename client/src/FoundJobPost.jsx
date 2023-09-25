import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "./context/AppContexts";
import { useParams } from "react-router-dom";
import ENavigation from "./components/employerpagecomponents/ENavigation";
import Navigation from "./components/Navigation";
import axios from "axios";
import Avatar from "./components/Avatar";
import ApplicationFormModal from "./components/jobseekercomponents/jobpagecomponents/ApplicationFormModal";

function FoundJobPost() {
  const { content, user } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [foundJobPost, setFoundJobPost] = useState();
  const params = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3005/found/job-post/${params.id}`)
      .then((response) => {
        setFoundJobPost(response.data);
      });
  }, [params.id]);

  const jobPostDesc = useRef();
  useEffect(() => {
    const element = jobPostDesc.current;
    if (foundJobPost?.Job_description) {
      element.innerHTML = foundJobPost?.Job_description;
    }
  }, [foundJobPost]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // console.log(foundJobPost);

  return (
    <>
      {user?.u_isemployer ? <ENavigation /> : <Navigation />}

      <div className="wrapper found-job-post">
        <div className="found-job-post-header">
          <Avatar
            avatarsize="1"
            src={foundJobPost?.Company_id?.Picture || "images/Job.png"}
          />
          <div className="job__search--title">
            <h4 className="job__post__title">{foundJobPost?.Job_title}</h4>
            <h6 className="company__name">{foundJobPost?.Company_name}</h6>
            <h6 className="job__location">{foundJobPost?.Job_location}</h6>
          </div>
        </div>
        <div className="found-job-details">
          {foundJobPost !== null && (
            <div className="content-wrapper">
              <div className="job__apply--header">
                <h4>{foundJobPost?.Job_title}</h4>
                <p className="subTitle">{foundJobPost?.Company_name}</p>
                <p>
                  ${foundJobPost?.Salary_range} {foundJobPost?.Employment_type}{" "}
                  {foundJobPost?.Work_type}
                </p>

                <button className="yellow" onClick={handleOpenModal}>
                  {content.easyapply}
                </button>
                {showModal && (
                  <ApplicationFormModal
                    jobId={foundJobPost?._id}
                    closeModal={handleCloseModal}
                  />
                )}
              </div>
              <p></p>

              {/* <div className="found-job-post-skill">
                {foundJobPost?.Skills?.map((skill, i) => {
                  return <span key={i}>{skill}</span>;
                })}
              </div> */}

              <div className="job__apply--desc">
                <h4>{content.jobdescription}</h4>
                <div className="ql-editor">
                  <p ref={jobPostDesc}></p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FoundJobPost;
