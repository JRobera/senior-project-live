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
      .get(`http://localhost:3005/get-user-profile/${user?.u_id}`)
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
    setExperience(userProfile?.Experience_id);
    setEducation(userProfile?.Education_id);
    setCertification([userProfile?.Certification_id]);
    setSkill(userProfile?.Skill_id);
  }, [userProfile]);

  const [addPostion, setAddPosition] = useState(false);
  const [addEducation, setAddEducation] = useState(false);
  const [addCertification, setAddCertification] = useState(false);
  const [addSkill, setAddSkill] = useState(false);

  const [newUserName, setNewUserName] = useState();
  const [userJobTitle, setUserJobTitle] = useState();
  const [aboutUser, setAboutUser] = useState();
  const [userLocation, setUserLocation] = useState();
  const [experiences, setExperience] = useState([userProfile?.Experience_id]);
  const [educations, setEducation] = useState([userProfile?.Education_id]);
  const [certifications, setCertification] = useState([
    userProfile?.Certification_id,
  ]);

  const [skills, setSkill] = useState();
  const [newSkill, setNewSkill] = useState([]);
  const [getExpDetail, setGetExpDetail] = useState({
    _id: "",
    title: "",
    company: "",
    description: "",
    duration: "",
  });
  const [getEduDetail, setGetEduDetail] = useState({
    _id: "",
    school: "",
    description: "",
    duration: "",
  });
  const [getCerDetail, setGetCerDetail] = useState({
    _id: "",
    name: "",
    description: "",
    duration: "",
  });

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

  function handleNewExperience(newexperience) {
    setExperience((prev) => {
      return [...prev, newexperience];
    });
    console.log(experiences);
  }

  function handleNewEducation(neweducation) {
    setEducation((prev) => {
      if (prev !== null) {
        return [...prev, neweducation];
      }
    });
    console.log(educations);
  }

  function handleDeleteExperience(i) {
    setExperience(
      experiences.filter((experience, index) => {
        return i !== index && experience;
      })
    );
  }

  function handleDeleteEducation(i) {
    setEducation(
      educations.filter((education, index) => {
        return i !== index && education;
      })
    );
  }

  function handleDeleteCertification(i) {
    setCertification(
      certifications.filter((certification, index) => {
        return i !== index && certification;
      })
    );
  }

  function handleNewSkill(newskill) {
    setSkill((prev) => {
      return [...prev, newskill];
    });
    console.log(newSkill);
    setNewSkill((prev) => {
      return [...prev, newskill];
    });
  }

  function handleDeleteSkill(rmskill) {
    setSkill(
      skills.filter((skill) => {
        return skill !== rmskill;
      })
    );
    setNewSkill(
      newSkill.filter((skill) => {
        return skill !== rmskill;
      })
    );
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
      .post(`http://localhost:3005/edit-profile/${user?.u_id}`, {
        newUserName,
        userJobTitle,
        aboutUser,
        userLocation,
        skills,
        educations,
        experiences,
        certifications,
      })
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
            <label htmlFor="fname">{content.name}</label>
            <input
              id="fname"
              type="text"
              placeholder={content.name}
              value={newUserName}
              onChange={handleNameChange}
            />
          </div>

          <div className="job-title-container">
            <label htmlFor="jobtitle">{content.jobtitle}</label>
            <input
              id="jobtitle"
              type="text"
              placeholder={content.jobtitle}
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

          <div className="ed-current-position">
            <p className="ex-header">{content.experience}</p>

            <div className="add-experience">
              {experiences?.map((experience, i) => {
                // console.log(experience);
                return (
                  <p>
                    <span
                      title="Click to edit"
                      onClick={() => {
                        setGetExpDetail({
                          _id: experience?._id,
                          title: experience?.Title || experience?.title,
                          company: experience?.Company || experience?.company,
                          description:
                            experience?.Description || experience?.description,
                          duration:
                            experience?.Duration || experience?.duration,
                        });
                        handleDeleteExperience(i);
                        setAddPosition(true);
                      }}
                    >
                      {experience?.Title}
                    </span>
                    <span
                      onClick={() => {
                        handleDeleteExperience(i);
                        axios
                          .delete(
                            `http://localhost:3005/delete-exp/${experience?._id}`
                          )
                          .then((response) => {});
                      }}
                    >
                      <GrClose />
                    </span>
                  </p>
                );
              })}
            </div>

            <div
              className="add-exp"
              onClick={() => {
                setAddPosition(!addPostion);
              }}
            >
              <GrAdd /> {content.addnewexperience}
            </div>
            {addPostion ? (
              <AddExperience
                handleNewExperience={handleNewExperience}
                getExpDetail={getExpDetail}
              />
            ) : null}
          </div>

          <div className="ed-education">
            <p className="ed-header">{content.education}</p>
            <div className="add-education">
              {educations?.map((education, i) => {
                // console.log(educations);
                return (
                  <p>
                    <span
                      title="Click to edit"
                      onClick={() => {
                        setGetEduDetail({
                          _id: education?._id,
                          school: education?.School || education?.school,
                          description:
                            education?.Description || education?.description,
                          duration: education?.Duration || education?.duration,
                        });
                        handleDeleteEducation(i);
                        setAddEducation(true);
                      }}
                    >
                      {education?.School}
                    </span>
                    <span
                      onClick={() => {
                        handleDeleteEducation(i);
                        axios
                          .delete(
                            `http://localhost:3005/delete-edu/${education?._id}`
                          )
                          .then((response) => {});
                      }}
                    >
                      <GrClose />
                    </span>
                  </p>
                );
              })}
            </div>
            <div
              className="add-edu"
              onClick={() => {
                setAddEducation(!addEducation);
              }}
            >
              <GrAdd /> {content.addneweducation}
            </div>
            {addEducation ? (
              <AddEducation
                handleNewEducation={handleNewEducation}
                getEduDetail={getEduDetail}
              />
            ) : null}
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

              {/* <div className="city-name">
                <label htmlFor="city">City</label>
                <input type="text" id="city" placeholder="Enter city name" />
              </div> */}
            </div>
          </div>

          <div className="ed-skill">
            <p>{content.skill}</p>
            <div className="new-skills">
              {skills?.map((skill, index) => {
                return (
                  <p key={index}>
                    <span>{skill}</span>
                    <span
                      onClick={() => {
                        handleDeleteSkill(skill);
                      }}
                    >
                      <GrClose />
                    </span>
                  </p>
                );
              })}
            </div>
            <span
              onClick={() => {
                setAddSkill(!addSkill);
              }}
            >
              <GrAdd /> {content.addskill}
            </span>
            {addSkill ? <AddSkill handleNewSkill={handleNewSkill} /> : null}
          </div>

          <div className="ed-certification">
            <p className="ec-header">{content.certification}</p>

            <div className="add-experience">
              {certifications?.map((certification, i) => {
                console.log(certification);
                return (
                  <p>
                    <span
                      title="Click to edit"
                      onClick={() => {
                        setGetCerDetail({
                          _id: certification?._id,
                          name: certification?.Name,
                          description: certification?.Description,
                          duration: certification?.Duration,
                        });
                        handleDeleteCertification(i);
                        setAddCertification(true);
                      }}
                    >
                      {certification?.Name}
                    </span>
                    <span
                      onClick={() => {
                        handleDeleteCertification(i);
                        axios
                          .delete(
                            `http://localhost:3005/delete-cer/${certification?._id}`
                          )
                          .then((response) => {});
                      }}
                    >
                      <GrClose />
                    </span>
                  </p>
                );
              })}
            </div>

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
                getCerDetail={getCerDetail}
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
