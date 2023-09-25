import React, { useContext, useRef, useState } from "react";
import "./photoPost.css";
import { GrClose } from "react-icons/gr";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { generateError, generatesuccess } from "../../../../utility/Toasts.js";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../../../context/AppContexts";

function PhotoPost({ handlePhotoInputClick, handleRefreshOnPost }) {
  const { content, user, accessToken, setUser, setaccessToken } =
    useContext(AppContext);
  const [showPhotoPostForm, setPhotoPostForm] = useState(false);
  const [photoPost, setPhotoPost] = useState();
  const [postDescription, setPostDescription] = useState("");
  const [pickImage, setPickImage] = useState(`${content.selectphoto}`); //show the selected file name
  const [isLoading, setIsLoading] = useState(false);
  // handles selected image to post
  function selectPhoto(e) {
    setPickImage(e.target.files[0].name);
    setPhotoPost(e.target.files[0]);
  }

  const styles = {
    overflow: "hidden",
    resize: "vertical",
  };

  // handles change in photo description
  function handleChange(e) {
    const { value } = e.target;
    setPostDescription(value);
  }
  // handles submit
  function handleClick() {
    const formData = new FormData();
    formData.append("postImage", photoPost);
    formData.append("postDescription", postDescription);
    setIsLoading(true);
    axios
      .post(
        `https://senior-project-live-api.onrender.com/new/photo-post/${user.u_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then((response) => {
        handlePhotoInputClick();
        generatesuccess(response.data);
        setIsLoading(false);
        handleRefreshOnPost();
      })
      .catch((err) => {
        setIsLoading(false);
        generateError(err);
        handlePhotoInputClick();
      });
    console.log(postDescription);
  }
  return (
    <div className="photo-post-overlay">
      <div className="photo-post-wrapper">
        <div className="photo-post-header">
          <p>{content.post}</p>
          <div onClick={handlePhotoInputClick}>
            <GrClose />
          </div>
        </div>
        <div className="import-photo">
          <input
            id="add-photo"
            type="file"
            accept="image/*"
            onChange={selectPhoto}
          />
          <label htmlFor="add-photo">{pickImage}</label>
        </div>
        <textarea
          className="photo-post-description"
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

        <button className="btn-post-photo" onClick={handleClick}>
          {isLoading ? `${content.posting}...` : `${content.post}`}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default PhotoPost;
