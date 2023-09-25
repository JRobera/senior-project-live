import React, { useContext, useEffect, useState } from "react";
import "./EditProfile.css";
import { GrClose, GrAdd } from "react-icons/gr";
import AddEducation from "./AddEducation";
import AddSkill from "./AddSkill";
import { AppContext } from "../../../../context/AppContexts";
import AddExperience from "./AddExperience";
import axios from "axios";
import AddCertification from "./AddCertification";

function EditProfile({ handleEditProfclick }) {
  const { content, user } = useContext(AppContext);
  // const [addExperiance, setAddExperiance] = useState(false)
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    axios
      .get(
        `https://senior-project-live-api.onrender.com/get-user-profile/${user?.u_id}`
      )
      .then((response) => {
        setUserProfile(response.data);
        console.log(response.data);
      });
  }, []);

  useEffect(() => {
    setNewUserName(userProfile?.Name);
    setUserJobTitle(userProfile?.Job_title);
    setAboutUser(userProfile?.About);
    setUserLocation(userProfile?.Location);
  }, [userProfile]);

  const [addCertification, setAddCertification] = useState(false);

  const [newUserName, setNewUserName] = useState();
  const [userJobTitle, setUserJobTitle] = useState();
  const [aboutUser, setAboutUser] = useState();
  const [userLocation, setUserLocation] = useState();
  const [certifications, setCertification] = useState([
    userProfile?.Certification_id,
  ]);

  function handleNameChange(e) {
    const { value } = e.target;
    setNewUserName(value);
  }

  function handleJobTitleChange(e) {
    const { value } = e.target;
    setUserJobTitle(value);
  }

  function handleSummeryChange(e) {
    const { value } = e.target;
    setAboutUser(value);
  }

  function handleLocationChange(e) {
    const { value } = e.target;
    setUserLocation(value);
  }

  function handleNewCertification(newcertification) {
    setCertification((prev) => {
      if (prev !== null) {
        return [...prev, newcertification];
      }
    });
    console.log(certifications);
  }

  function handleSubmit() {
    axios
      .post(
        `https://senior-project-live-api.onrender.com/edit-emp-profile/${user?.u_id}`,
        {
          newUserName,
          userJobTitle,
          aboutUser,
          userLocation,
          certifications,
        }
      )
      .then((response) => {
        console.log(response);
      });
    handleEditProfclick();
  }

  return (
    <div className="ed-overlay">
      <div className="edit-profile-wrapper">
        <div className="ed-wrapper-header">
          <p>{content.editprofile}</p>
          <div className="ed-close" onClick={handleEditProfclick}>
            <GrClose />
          </div>
        </div>
        <form>
          <div className="fname-container">
            <label htmlFor="cname">{content.companyname}</label>
            <input
              id="cname"
              type="text"
              placeholder={content.name}
              value={newUserName}
              onChange={handleNameChange}
            />
          </div>

          <div className="job-title-container">
            <label htmlFor="jobtitle">{content.jobtype}</label>
            <input
              id="jobtitle"
              type="text"
              placeholder={content.jobtype}
              value={userJobTitle}
              onChange={handleJobTitleChange}
            />
          </div>

          <div className="about-container">
            <label htmlFor="ab">{content.about}</label>
            <textarea
              name=""
              id="ab"
              rows="10"
              placeholder={content.summeryaboutyou}
              value={aboutUser}
              onChange={handleSummeryChange}
            ></textarea>
          </div>

          <div className="ed-location">
            <p>{content.location}</p>
            <div>
              <div className="country-name">
                <label htmlFor="country">{content.countryregion}</label>
                <input
                  type="text"
                  id="country"
                  placeholder={content.entercountrynamecityname}
                  value={userLocation}
                  onChange={handleLocationChange}
                />
              </div>
            </div>
          </div>

          <div className="ed-certification">
            <p className="ec-header">{content.certification}</p>
            <div
              className="add-cer"
              onClick={() => {
                setAddCertification(!addCertification);
              }}
            >
              <GrAdd /> {content.addnewcertification}
            </div>
            {addCertification ? (
              <AddCertification
                handleNewCertification={handleNewCertification}
              />
            ) : null}
          </div>
          {/* <div className="ed-contact">
            <p>Contact info</p>
            <span>
              <GrAdd /> Edit contact info
            </span>
          </div> */}
        </form>
        <div className="ed-wrapper-footer">
          <button className="btn-save-profile" onClick={handleSubmit}>
            {content.save}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
