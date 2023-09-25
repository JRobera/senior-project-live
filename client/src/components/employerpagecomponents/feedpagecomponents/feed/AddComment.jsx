import React, { useContext, useEffect, useState } from "react";
import "./AddComment.css";
import Comment from "./Comment";
import axios from "axios";
import { AppContext } from "../../../../context/AppContexts";

function AddComment({ postId, userId, commentCount }) {
  const { content } = useContext(AppContext);
  const [newComment, setNewComment] = useState();
  const [comments, setcomment] = useState();

  function handleSubmit() {
    if (newComment) {
      axios
        .post(`https://senior-project-live-api.onrender.com/add/comment`, {
          postId: postId,
          userId: userId,
          comment: newComment,
        })
        .then((response) => {
          console.log(response.data);
          setNewComment("");
        });
    }
  }
  useEffect(() => {
    axios
      .get(
        `https://senior-project-live-api.onrender.com/get/comments/${postId}`
      )
      .then((response) => {
        console.log(response.data.Comment);
        commentCount(response.data.Comment.length);
        setcomment(response.data.Comment);
      });
  }, [newComment]);

  return (
    <div>
      <div className="comment-input-wrapper">
        <textarea
          value={newComment}
          name=""
          id="add-comment"
          //   cols="30"
          //   rows="10"
          placeholder={content.addcomment}
          onChange={(e) => {
            const { value } = e.target;
            setNewComment(value);
          }}
        ></textarea>
        <button className="btn-post-comment" onClick={handleSubmit}>
          {content.post}
        </button>
      </div>

      {comments?.map((comment) => {
        return (
          <Comment
            key={comment?._id}
            commentId={comment?._id}
            userId={userId}
            comment={comment}
          />
        );
      })}
    </div>
  );
}

export default AddComment;
