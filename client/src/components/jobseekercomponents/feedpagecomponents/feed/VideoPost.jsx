import React, { useContext, useState } from "react";
import "./videoPost.css";
import { GrClose } from "react-icons/gr";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { generateError, generatesuccess } from "../../../../utility/Toasts.js";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../../../context/AppContexts";

function VideoPost({ handleVideoInputClick, handleRefreshOnPost }) {
  const { content, user, accessToken, setUser, setaccessToken } =
    useContext(AppContext);
  const [showVideoPostForm, setVideoPostForm] = useState(false);
  const [videoPost, setVideoPost] = useState();
  const [videoPostDescription, setVideoPostDescription] = useState("");
  const [pickVideo, setPickVideo] = useState(`${content.selectvideo}`);
  const [isLoading, setIsLoading] = useState(false);

  //handles selected video to post
  function selectVideo(e) {
    setPickVideo(e.target.files[0].name);
    setVideoPost(e.target.files[0]);
  }

  const styles = {
    overflow: "hidden",
    resize: "vertical",
  };

  //handles change in video description
  function handleChange(e) {
    const { value } = e.target;
    setVideoPostDescription(value);
  }

  // handles submit for video post
  function handleClick() {
    const formData = new FormData();
    formData.append("postVideo", videoPost);
    formData.append("postDescription", videoPostDescription);
    setIsLoading(true);
    axios
      .post(
        `https://senior-project-live-api.onrender.com/new/video-post/${user.u_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then((response) => {
        handleVideoInputClick();
        generatesuccess(response.data);
        setIsLoading(false);
        handleRefreshOnPost();
      })
      .catch((err) => {
        generateError(err);
        handleVideoInputClick();
        setIsLoading(false);
      });

    console.log(videoPostDescription);
  }
  return (
    <div className="video-post-overlay">
      <div className="video-post-wrapper">
        <div className="video-post-header">
          <p>{content.video}</p>
          <div onClick={handleVideoInputClick}>
            <GrClose />
          </div>
        </div>
        <div className="import-video">
          <input
            id="add-video"
            type="file"
            accept="video/*"
            onChange={selectVideo}
          />
          <label htmlFor="add-video">{pickVideo}</label>
        </div>
        <textarea
          className="video-post-description"
          name=""
          id=""
          placeholder={content.adddescription}
          style={styles}
          rows="1"
          onInput={(e) => {
            e.target.rows = e.target.value.split("\n").length;
          }}
          onChange={handleChange}
        ></textarea>
        <button className="btn-post-video" onClick={handleClick}>
          {isLoading ? `${content.posting}...` : `${content.post}`}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default VideoPost;
