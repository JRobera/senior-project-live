import React, { useState, useEffect, useContext } from "react";
import Avatar from "../../../Avatar";
import axios from "axios";
import { AppContext } from "../../../../context/AppContexts";

function ReplyComment({
  replyTo,
  text,
  reply,
  commentId,
  userId,
  handlesetReplies,
}) {
  const { content } = useContext(AppContext);
  const [showReply, setReply] = useState(false);
  const [replyComment, setReplyComment] = useState();

  function handleReply() {
    if (replyComment) {
      axios
        .post(
          "https://senior-project-live-api.onrender.com/add/comment/reply",
          {
            commentId: commentId,
            userId: userId,
            reply: replyComment,
          }
        )
        .then((response) => {
          console.log(response.data);
          setReplyComment("");
        });
    }
  }

  useEffect(() => {
    axios
      .get(
        `https://senior-project-live-api.onrender.com/get/comment/reply/${commentId}`
      )
      .then((response) => {
        // console.log(response.data.Comment_reply);
        handlesetReplies(response.data.Comment_reply);
      });
  }, [replyComment]);

  return (
    <div className="comment reply">
      <Avatar avatarsize={1} src={reply.User_id?.Picture} />
      <div className="comment-item">
        <div className="reply-to">
          <p>
            {content.replyto}
            <strong>{replyTo}</strong>
          </p>
          <p>{text}</p>
        </div>
        <div className="comment-user">
          <p className="comment-user-name">{reply.User_id?.Name}</p>
          <p className="comment-user-job-title">{reply.User_id?.Job_title}</p>
        </div>
        <p className="comment-text">{reply.Text}</p>
        <div className="comment-reaction">
          {/* <span onClick={() => {}}>Like</span>{" "} */}
          <span
            onClick={() => {
              setReply(!showReply);
            }}
          >
            {content.reply}
          </span>
        </div>
        {showReply && (
          <div className="comment-input-wrapper">
            <textarea
              value={replyComment}
              name=""
              id="add-comment"
              //   cols="30"
              //   rows="10"
              placeholder={content.addreply}
              onChange={(e) => {
                const { value } = e.target;
                setReplyComment(value);
              }}
            ></textarea>
            <button className="btn-reply-comment" onClick={handleReply}>
              {content.post}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReplyComment;
