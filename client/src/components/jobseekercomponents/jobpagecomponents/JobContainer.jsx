import React, { useContext, useEffect, useRef, useState } from "react";
import Navigation from "../../Navigation";
import "./JobContainer.css";

import SearchIcon from "@mui/icons-material/Search";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import WorkIcon from "@mui/icons-material/Work";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ApplicationFormModal from "./ApplicationFormModal";
import JobPostItem from "./JobPostItem";
import axios from "axios";
import "react-quill/dist/quill.core.css";
import { AppContext } from "../../../context/AppContexts";

function JobContainer() {
  const { content } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [jobPostItems, setJobPostItems] = useState();
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`https://senior-project-live-api.onrender.com/get-job-posts`)
      .then((response) => {
        setJobPostItems(response.data);
        // console.log(response.data);
      });
  }, []);

  const handleClick = (id) => {
    axios
      .get(
        `https://senior-project-live-api.onrender.com/get-selected-post/${id}`
      )
      .then((response) => {
        setJobDetails(response.data);
        console.log(response.data);
      });
    console.log(jobDetails);
  };

  const jobPostDesc = useRef();
  useEffect(() => {
    const element = jobPostDesc.current;
    if (jobDetails?.Job_description) {
      element.innerHTML = jobDetails?.Job_description;
    }
  }, [jobDetails]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Navigation />
      {/* <PayNav /> */}
      <div className="job__wrapper">
        {/* <div className="cards__container">
          <div className="wrap">
            <div className="job__box">
              <div className="job__box--wrapper">
                <AddAlertIcon /> <p>My jobs</p>
              </div>
              <div className="job__box--wrapper">
                <BookmarkBorderIcon />
                <p>Jobs alerts</p>
              </div>
            </div>
          </div>
        </div> */}

        <div className="flex__container">
          <div className="job__search--list--wrapper">
            <div className="job__searchList--container">
              {jobPostItems?.map((jobpostitem) => {
                return (
                  <JobPostItem
                    key={jobpostitem?._id}
                    id={jobpostitem?._id}
                    handleClick={handleClick}
                    companyimage={jobpostitem?.Company_id?.Picture}
                    jobtitle={jobpostitem?.Job_title}
                    companyname={jobpostitem?.Company_name}
                    joblocation={jobpostitem?.Job_location}
                  />
                );
              })}
            </div>

            <div className="job__apply--container">
              {jobDetails !== null && (
                <div className="content-wrapper">
                  <div className="job__apply--header">
                    <h4>{jobDetails?.Job_title}</h4>
                    <p className="subTitle">{jobDetails?.Company_name}</p>
                    <p>
                      {/* <WorkIcon
                      style={{
                        color: "#616060",
                        width: "30px",
                        height: "30px",
                      }}
                    /> */}
                      ${jobDetails?.Salary_range} {jobDetails?.Employment_type}
                    </p>

                    <button className="yellow" onClick={handleOpenModal}>
                      {content.easyapply}
                    </button>
                    {showModal && (
                      <ApplicationFormModal
                        jobId={jobDetails?._id}
                        closeModal={handleCloseModal}
                      />
                    )}
                  </div>
                  {/* <div className="job__apply--team">
                    <h4>Meet the hiring team</h4>
                    <div className="apply_nameTitle">
                      <AccountCircleIcon
                        style={{
                          width: "40px",
                          height: "40px",
                          color: "#616060",
                        }}
                      />
                      <div className="job__apply--name">
                        <p className="team--name">Able Kebede</p>
                        <p className="team--desc">Human Resource Assistance</p>
                      </div>
                    </div>
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
        </div>
      </div>
    </>
  );
}

export default JobContainer;
