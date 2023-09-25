import React, { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import { FiEdit, FiMoreHorizontal } from "react-icons/fi";
import { RiDeleteBin6Line, RiEditBoxLine } from "react-icons/ri";

import "./mypost.css";
import { generatesuccess } from "../../../utility/Toasts";
import { AppContext } from "../../../context/AppContexts";
function MyPost({ post, handlePost, userid }) {
  const { content } = useContext(AppContext);
  const [showMore, setShowMore] = useState();
  const [newDescription, setNewDescription] = useState(post?.Post_description);
  const [editPost, setEditPost] = useState(false);

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

  function handleUpdatePost() {
    setEditPost(false);
    axios
      .patch(`http://localhost:3005/edit/post`, {
        postid: post._id,
        description: newDescription,
      })
      .then((response) => {
        generatesuccess(response.data);
        handlePost();
      });
  }

  function handleChange(e) {
    const { value } = e.target;
    setNewDescription(value);
  }
  useEffect(() => {
    editPost
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
  }, [editPost]);

  const styles = {
    overflow: "hidden",
    resize: "vertical",
  };

  return (
    <div className="post user-p">
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
                  `http://localhost:3005/delete/post/${post._id}/${userid}`
                )
                .then((resposne) => {
                  generatesuccess(resposne.data);
                  handlePost();
                });
            }}
          >
            <RiDeleteBin6Line size={"1.2rem"} />
            Delete
          </p>
          <p
            className="edit-post"
            onClick={() => {
              setEditPost(true);
            }}
          >
            <FiEdit size={"1.2rem"} />
            Edit
          </p>
        </div>
      )}

      {/* <p>{post.Post_content}</p> */}
      <p className="post-description">{post?.Post_description}</p>
      {post?.postFormat == "png" ||
      post?.postFormat == "jpg" ||
      post?.postFormat == "jpeg" ||
      post?.postFormat == "gif" ? (
        <img src={post?.postUrl} alt="post image" />
      ) : post?.postFormat == "mp4" ||
        post?.postFormat == "webm" ||
        post?.postFormat == "mkv" ? (
        <video controls src={post?.postUrl} alt="post video" />
      ) : null}
      {editPost && (
        <div className="edit-post-overlay">
          <div className="edit-post-wrapper">
            <textarea
              className=""
              name=""
              id=""
              placeholder={content.adddescription}
              style={styles}
              rows="1"
              onInput={(e) => {
                e.target.rows = e.target.value.split("\n").length;
              }}
              value={newDescription}
              onChange={handleChange}
            ></textarea>
            <div>
              <button
                className="btn-edit-post-cancle"
                onClick={() => {
                  setEditPost(false);
                }}
              >
                Cancle
              </button>
              <button className="btn-update-post" onClick={handleUpdatePost}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPost;
