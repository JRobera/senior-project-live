import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Avatar from "../../Avatar";
import "./JobItems.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiMoreHorizontal } from "react-icons/fi";
import { generatesuccess } from "../../../utility/Toasts";
import { Link } from "react-router-dom";
import { AppContext } from "../../../context/AppContexts";

function JobItems({ postid, userid, userimg, jobtitle, handleJobPost }) {
  const [showMore, setShowMore] = useState();
  const { content } = useContext(AppContext);

  const btnRef = useRef();
  useEffect(() => {
    const closeShowmore = (e) => {
      if (btnRef.current && !btnRef.current.contains(e.target)) {
        setShowMore(false);
      }
    };

    document.addEventListener("click", closeShowmore);
    return () => {
      document.removeEventListener("click", closeShowmore);
    };
  }, []);

  return (
    <div className="job-list-item-wrapper">
      <div
        className="actions"
        ref={btnRef}
        onClick={() => {
          setShowMore(!showMore);
        }}
      >
        <FiMoreHorizontal size={"1.2rem"} />
      </div>

      {showMore && (
        <div className="actions-more-popup">
          <p
            onClick={() => {
              axios
                .delete(
                  `https://senior-project-live-api.onrender.com/delete/job-post/${postid}/${userid}`
                )
                .then((resposne) => {
                  generatesuccess(resposne.data);
                  handleJobPost();
                });
            }}
          >
            <RiDeleteBin6Line size={"1.2rem"} />
            Delete
          </p>
        </div>
      )}
      <div>
        <div className="job-item-header">
          <Avatar src={userimg} avatarsize={1} />
          <span>{jobtitle}</span>
        </div>
        <Link to={"/job-applicants/" + postid}>
          {content.applicants} {}
        </Link>
        {/* <div className="">
          <p>{jobtitle}</p>
          <p>{employmenttype}</p>
          <p>{worktype}</p>
          <div className="job-list-skills-wrapper">
            {skills?.map((skill, i) => {
              return (
                <span key={i} className="job-list-item-skill">
                  {skill}
                </span>
              );
            })}
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default JobItems;
{
}
