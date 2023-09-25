import React, { useState, useEffect } from "react";
import "./TopContainer.css";
import Avatar from "../../Avatar";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { BsCamera } from "react-icons/bs";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContexts";
import EditProfile from "./editprofile/EditProfile";

function TopProfileContainer({ fuser, handleProfileEditRefresh }) {
  const { content, user } = useContext(AppContext);
  const [showEditProf, setEditProf] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [selectedCoverImage, setSelectedCoverImage] = useState(null);

  function handleSelectProfileImage(e) {
    const file = e.target.files[0];
    // Create a new FormData object and append the selected profile image
    const formData = new FormData();
    formData.append("profileImage", file);

    // Make the API request to update the profile image
    axios
      .put(
        `https://senior-project-live-api.onrender.com/change-profile/${user.u_id}`,
        formData
      )
      .then((response) => {
        // Update the selected profile image state
        setSelectedProfileImage(response.data.Picture);
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
    // setSelectedProfileImage(e.target.files[0]);
  }

  function handleSelectCoverImage(e) {
    const file = e.target.files[0];

    // Create a new FormData object and append the selected profile image
    const formData = new FormData();
    formData.append("coverImage", file);

    // Make the API request to update the profile image
    axios
      .put(
        `https://senior-project-live-api.onrender.com/change-cover/${user.u_id}`,
        formData
      )
      .then((response) => {
        // Update the selected profile image state
        setSelectedCoverImage(response.data.Profile_bg);
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
    // setSelectedProfileImage(e.target.files[0]);
  }

  useEffect(() => {
    showEditProf
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
    // console.log(showEditProf);
  }, [showEditProf]);

  useEffect(() => {
    setIsEditable(user?.u_id === fuser?._id);
  }, [user, fuser]);

  function handleEditProfclick() {
    setEditProf(!showEditProf);
  }
  useEffect(() => {
    handleProfileEditRefresh();
  }, [showEditProf]);

  // console.log(isEditable);
  return (
    <div className="top-container-wrapper">
      <div
        className="background"
        style={{
          backgroundImage: `url(${selectedCoverImage || fuser?.Profile_bg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {isEditable ? (
          <>
            <div
              className="edit-profile-bg"
              title="Edit profile background"
              onClick={() => {
                let input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.addEventListener("change", handleSelectCoverImage);
                input.click();
              }}
            >
              <BsCamera size={"1rem"} color={"#fff"} />
            </div>
            <div className="edit-profile" onClick={handleEditProfclick}>
              <FiEdit />
              <p>{content.editprofile}</p>
            </div>{" "}
          </>
        ) : null}
        {showEditProf && (
          <EditProfile handleEditProfclick={handleEditProfclick} />
        )}
      </div>

      <div className="bio-container">
        <div
          onClick={() => {
            console.log("edit profile image");
          }}
        >
          <div className="update-avatar">
            <Avatar
              avatarsize="2"
              src={selectedProfileImage || fuser?.Picture}
            />
            {isEditable ? (
              <span
                className="change-camera-icon"
                onClick={() => {
                  let input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.addEventListener("change", handleSelectProfileImage);
                  input.click();
                }}
              >
                <BsCamera size={"1rem"} color={"#fff"} />
              </span>
            ) : null}
          </div>
        </div>
        <div className="bio">
          <div>
            <h3>
              {fuser?.Name}
              <p>{fuser?.Job_title}</p>
            </h3>
            <p className="location">{fuser?.Location}</p>
          </div>

          <p>{fuser?.About}</p>
        </div>
      </div>
    </div>
  );
}

export default TopProfileContainer;
