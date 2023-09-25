import React, { useContext, useEffect, useState } from "react";
import "./Comment.css";
import Avatar from "../../../Avatar";
import axios from "axios";
import ReplyComment from "./ReplyComment";
import { AppContext } from "../../../../context/AppContexts";

function Comment({ commentId, userId, comment }) {
  const { content } = useContext(AppContext);
  const { Text, User_id } = comment;
  const [showReply, setReply] = useState(false);
  const [replyComment, setReplyComment] = useState();
  const [replies, setReplies] = useState();

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

  function handlesetReplies(data) {
    setReplies(data);
  }
  useEffect(() => {
    axios
      .get(
        `https://senior-project-live-api.onrender.com/get/comment/reply/${commentId}`
      )
      .then((response) => {
        // console.log(response.data.Comment_reply);
        setReplies(response.data.Comment_reply);
      });
  }, [replyComment]);

  // console.log(User_id);
  return (
    <div className="comment-wrapper">
      <div className="comment">
        <Avatar avatarsize={1} src={User_id?.Picture} />
        <div className="comment-item">
          <div className="comment-user">
            <p className="comment-user-name">
              {User_id?.Name || User_id?.Company_name}
            </p>
            <p className="comment-user-job-title">
              {User_id?.Job_title || User_id?.Job_type}
            </p>
          </div>
          <p className="comment-text">{Text}</p>
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
                placeholder={content.addcomment}
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
      {replies?.map((reply) => {
        return (
          <ReplyComment
            replyTo={User_id?.Name || User_id?.Company_name}
            text={Text}
            reply={reply}
            commentId={commentId}
            userId={userId}
            handlesetReplies={handlesetReplies}
          />
        );
      })}
    </div>
  );
}

export default Comment;
