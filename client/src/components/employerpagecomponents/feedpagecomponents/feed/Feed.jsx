import React, { useContext, useEffect, useState } from "react";
import "./feed.css";
import InputOption from "./InputOption";
import Post from "./Post";

import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { Link } from "react-router-dom";
import PhotoPost from "./PhotoPost";
import VideoPost from "./VideoPost";
import axios from "axios";
import { AppContext } from "../../../../context/AppContexts";
import { generateError, generatesuccess } from "../../../../utility/Toasts";

function Feed() {
  const { content, user, accessToken } = useContext(AppContext);
  const [showPhotoPost, setPhotoPost] = useState(false);
  const [showVideoPost, setViedeoPost] = useState(false);
  const [posts, setPosts] = useState();
  const [textPost, setTextPost] = useState("");
  const [isExpand, setExpand] = useState(false);

  function handleRefreshOnPost() {
    axios.get("http://localhost:3005/get/posts").then((response) => {
      setPosts(response.data);
    });
  }

  useEffect(() => {
    axios.get("http://localhost:3005/get/posts").then((response) => {
      setPosts(response.data);
      // console.log(response.data);
    });
  }, []);

  //
  useEffect(() => {
    showPhotoPost
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
  }, [showPhotoPost]);
  //
  useEffect(() => {
    showVideoPost
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
  }, [showVideoPost]);

  function handleChange(e) {
    const { value } = e.target;
    setTextPost(value);
  }

  const handleTextPost = () => {
    if (textPost !== "") {
      axios
        .post(
          `http://localhost:3005/new/text-post/${user.u_id}`,
          { textPost },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
          }
        )
        .then((response) => {
          generatesuccess(response.data);
          setTextPost("");
          handleRefreshOnPost(); // Optional: Refresh posts after successful submission
        })
        .catch((err) => {
          generateError(err);
        });
    }
  };

  function handlePhotoInputClick() {
    setPhotoPost(!showPhotoPost);
  }
  function handleVideoInputClick() {
    setViedeoPost(!showVideoPost);
  }
  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <div className="feed__input__wrapper">
            <textarea
              className="text-post-description"
              placeholder={content.whatisonyourmind}
              value={textPost}
              onChange={(e) => setTextPost(e.target.value)}
              rows="1"
              // style={styles}
            ></textarea>

            <button className="btn-text-post" onClick={handleTextPost}>
              {content.post}
            </button>
          </div>
        </div>
        <div className="feed__inputOptions">
          <InputOption
            Icon={BrokenImageOutlinedIcon}
            title={content.photo}
            color="#70B5F9"
            handleClick={handlePhotoInputClick}
          />
          {showPhotoPost && (
            <PhotoPost
              handlePhotoInputClick={handlePhotoInputClick}
              handleRefreshOnPost={handleRefreshOnPost}
            />
          )}
          <InputOption
            Icon={SubscriptionsOutlinedIcon}
            title={content.video}
            color="#70B5F9"
            handleClick={handleVideoInputClick}
          />
          {showVideoPost && (
            <VideoPost
              handleVideoInputClick={handleVideoInputClick}
              handleRefreshOnPost={handleRefreshOnPost}
            />
          )}
          {/* <InputOption Icon={EventNoteIcon} title="Event" color="#70B5F9" /> */}
          <Link to="/new/emp/article">
            <InputOption
              Icon={ArticleOutlinedIcon}
              title={content.writearticle}
              color="#70B5F9"
            />
          </Link>
        </div>
      </div>
      {posts?.map((post) => {
        return (
          <Post
            key={post._id}
            id={post._id}
            author={post?.User_id}
            src={post?.postUrl}
            format={post?.postFormat}
            description={post?.Post_description}
            likes={post?.Total_like.length}
            comments={post?.Comment.length}
            liked={post?.Total_like}
            handleRefreshOnPost={handleRefreshOnPost}
          />
        );
      })}
    </div>
  );
}

export default Feed;
