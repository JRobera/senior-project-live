import { Avatar } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "./myarticle.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiMoreHorizontal } from "react-icons/fi";
import axios from "axios";
import { generatesuccess } from "../../../utility/Toasts";

function MyArticle({ name, description, message, id, userid, handleArticle }) {
  const msg = useRef();
  const [showMore, setShowMore] = useState();

  useEffect(() => {
    const element = msg.current;
    element.innerHTML = message;
  }, []);

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
    <div className="profile-article">
      <div className="profile-article-header">
        <Avatar />
        <div className="profile-user-info">
          <h4>{name}</h4>
          <p>{description}</p>
        </div>
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
              className="delete-post"
              onClick={() => {
                axios
                  .delete(
                    `https://senior-project-live-api.onrender.com/delete/article/${id}/${userid}`
                  )
                  .then((resposne) => {
                    generatesuccess(resposne.data);
                    handleArticle();
                  });
              }}
            >
              <RiDeleteBin6Line size={"1.2rem"} />
              Delete
            </p>
          </div>
        )}
      </div>

      <div className="profile-article-body">
        <p className="message" ref={msg}></p>
      </div>
    </div>
  );
}

export default MyArticle;
