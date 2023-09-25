import React, { useContext, useEffect, useState } from "react";
import Navigation from "../../Navigation";
import "./JobContainer.css";

import SearchIcon from "@mui/icons-material/Search";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import WorkIcon from "@mui/icons-material/Work";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import PostForm from "./PostForm";
import JobPostItem from "../../jobseekercomponents/jobpagecomponents/JobPostItem";
import { AppContext } from "../../../context/AppContexts";
function JobContainer() {
  const { content } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [jobPostItems, setJobPostItems] = useState();
  const [jobDetails, setJobDetails] = useState(null);

  function handleRefetchJoposts() {
    axios.get(`http://localhost:3005/get-job-posts`).then((response) => {
      setJobPostItems(response.data);
      console.log(response.data);
    });
  }

  useEffect(() => {
    handleRefetchJoposts();
  }, []);

  const handleClick = (id) => {
    axios
      .get(`http://localhost:3005/get-selected-post/${id}`)
      .then((response) => {
        setJobDetails(response.data);
        console.log(response.data);
      });
    console.log(jobDetails);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const showModalParam = urlParams.get("showModal");
    if (showModalParam === "true") {
      setShowModal(true);
    }
  }, []);

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

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const showModalParam = urlParams.get('showModal');
  //   const paymentSuccessParam = urlParams.get('paymentSuccess');
  //   if (showModalParam === 'true') {
  //     setShowModal(true);
  //   }
  //   if (paymentSuccessParam === 'true') {
  //     setPage(1);
  //   }
  // }, []);

  return (
    <>
      <Navigation />
      {/* <PayNav /> */}
      <div className="job__wrapper">
        <div className="cards__container">
          {/* <div className="wrap">
            <div className="job__box">
              <div className="job__box--wrapper">
                <AddAlertIcon /> <p>My jobs</p>
              </div>
              <div className="job__box--wrapper">
                <BookmarkBorderIcon />
                <p>Jobs alerts</p>
              </div>
            </div>
          </div> */}
          <div className="PostForm__component">
            <PostForm
              showModal={showModal}
              setShowModal={setShowModal}
              handleRefetchJoposts={handleRefetchJoposts}
            />
          </div>
        </div>

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
                    {/* <p className="avatar__img">
                      <AccountCircleIcon
                        style={{
                          color: "#616060",
                          width: "30px",
                          height: "30px",
                        }}
                      />
                      abel kebede is hiring for this job
                    </p> */}
                    {/* <button className="yellow" onClick={handleOpenModal}>
                      {content.easyapply}
                    </button> */}
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
