import React, { useEffect, useState } from "react";
import axios from "axios";
import "./JobApplicants.css";

import { useParams } from "react-router-dom";

function JobApplicants() {
  const [applicants, setApplicants] = useState();
  const params = useParams();

  function handleJobPostDetail() {
    axios
      .get(
        `https://senior-project-live-api.onrender.com/get-applicants/${params.id}`
      )
      .then((response) => {
        setApplicants(response.data);
        console.log(response.data);
      });
  }

  useEffect(() => {
    handleJobPostDetail();
  }, []);
  return (
    <div className="applicant-table-wrapper">
      <div className="applicant-table-header">
        <p className="a-table-title">{applicants?.Job_title}</p>
        <div className="columns">
          <span>Name</span>
          <span>Email</span>
          <span>Resume</span>
        </div>
      </div>
      {applicants?.Applicants?.map((applicant) => {
        console.log(applicant);
        return (
          <div className="applicant-detail">
            <span>{applicant?.userid?.Name}</span>
            <span>{applicant?.userid?.Email}</span>
            <a href={applicant?.resume} download={applicant?.userid?.Name}>
              Download Resume
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default JobApplicants;
