import React, { useContext, useEffect, useRef, useState } from "react";
import "./Post.css";
import InputOption from "./InputOption";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Avatar from "../../../Avatar";
import { AppContext } from "../../../../context/AppContexts";
import { Link } from "react-router-dom";
import axios from "axios";
import AddComment from "./AddComment";
import { generatesuccess } from "../../../../utility/Toasts";
import { FiMoreHorizontal, FiMoreVertical } from "react-icons/fi";

function Post({
  id,
  author,
  description,
  src,
  format,
  likes,
  comments,
  liked,
  handleRefreshOnPost,
  photoUrl,
}) {
  const { content, user } = useContext(AppContext);
  const [isFollowing, setIsFollowing] = useState(
    author?.Follower?.includes(user?.u_id)
  );
  const [isCurrentUser, setCurrentUser] = useState();
  const [likeCount, setLikeCount] = useState(likes);
  const [commentCount, setCommentCount] = useState(comments);
  const [showComment, setShowComment] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [report, setReport] = useState({ postId: "", report: "" });

  // useEffect(() => {
  //   console.log(likeCount);
  // }, [likeCount]);

  useEffect(() => {
    setCurrentUser(author?._id !== user?.u_id);
  }, [user]);

  useEffect(() => {
    showReport
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
  }, [showReport]);

  function handleComment() {
    setShowComment(!showComment);
  }

  function handleLike() {
    axios
      .patch(`http://localhost:3005/like/post/${id}/${user?.u_id}`)
      .then((response) => {
        if (response.data) {
          handleRefreshOnPost();
          setLikeCount(likeCount + 1);
        } else {
          handleRefreshOnPost();
          setLikeCount(likeCount - 1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCommentCount(count) {
    setCommentCount(count);
  }

  function handleShare() {
    axios
      .post(`http://localhost:3005/share/post/${user?.u_id}/${id}`)
      .then((response) => {
        generatesuccess(response.data);
      });
  }

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

  const styles = {
    overflow: "hidden",
    resize: "vertical",
  };

  function handleReportChange(e) {
    const { value } = e.target;
    setReport({ postId: id, report: value });
  }

  return (
    <div className="post">
      <div className="post__header">
        <Link className="user__info" to={"/profile/" + author?._id}>
          <Avatar avatarsize="1" src={author?.Picture} />
          <div className="post__info">
            <h4>{author?.Name}</h4>
            <p>{author?.Job_title}</p>
          </div>
        </Link>
        <button
          className="btn__follow"
          onClick={() => {
            !isFollowing
              ? axios
                  .patch(`http://localhost:3005/follow/user`, {
                    poster_id: author?._id,
                    user_id: user?.u_id,
                  })
                  .then((response) => {
                    setIsFollowing(true);
                    console.log(response.data);
                  })
              : axios
                  .patch(`http://localhost:3005/unfollow/user`, {
                    poster_id: author?._id,
                    user_id: user?.u_id,
                  })
                  .then((response) => {
                    setIsFollowing(false);
                    console.log(response.data);
                  });
          }}
        >
          {isCurrentUser
            ? isFollowing
              ? `${content.following}`
              : `${content.follow}`
            : null}
        </button>
        <div
          className=""
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
                setShowReport(true);
              }}
            >
              Report
            </p>
          </div>
        )}
        {showReport && (
          <div className="add-report-overlay">
            <div className="add-report">
              <textarea
                name=""
                id=""
                style={styles}
                rows="3"
                onInput={(e) => {
                  e.target.rows = e.target.value.split("\n").length;
                }}
                placeholder="Why did you report this?"
                onChange={handleReportChange}
              ></textarea>
              <div>
                <button
                  className="btn-report"
                  onClick={() => {
                    axios
                      .post(`http://localhost:3005/report/post/${id}`, {
                        report,
                      })
                      .then((resposne) => {
                        generatesuccess(resposne.data);
                        setShowReport(false);
                      });
                  }}
                >
                  Report
                </button>
                <button
                  className="btn-cancle"
                  onClick={() => {
                    setShowReport(false);
                  }}
                >
                  Cancle
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="post__body">
        <p>{description}</p>

        {format == "png" ||
        format == "jpg" ||
        format == "jpeg" ||
        format == "gif" ? (
          <img src={src} alt="post image" />
        ) : format == "mp4" || format == "webm" || format == "mkv" ? (
          <video controls src={src} alt="post video" />
        ) : null}
      </div>
      {/* TODO add like and comment coute */}
      <div className="post-reactions">
        <span className="post-like-count">
          {likeCount} {content.like}
        </span>
        <span className="post-comment-count">
          {commentCount} {content.comment}
        </span>
      </div>
      <div className="post__buttons">
        <InputOption
          Icon={ThumbUpOutlinedIcon}
          title={content.like}
          setlike={handleLike}
          color={liked.includes(user?.u_id) ? "#e8a901" : null}
        />
        <InputOption
          Icon={MessageOutlinedIcon}
          title={content.comment}
          setcomment={handleComment}
        />
        <InputOption
          Icon={ShareOutlinedIcon}
          title={content.share}
          sharepost={handleShare}
        />
        {/* <InputOption Icon={SendOutlinedIcon} title="Send" /> */}
      </div>
      {showComment && (
        <AddComment
          postId={id}
          userId={user.u_id}
          commentCount={handleCommentCount}
        />
      )}
    </div>
  );
}

export default Post;
