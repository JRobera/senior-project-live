import React, { useContext } from "react";
import "./Education.css";
import Avatar from "../../Avatar";
import { AppContext } from "../../../context/AppContexts";

function Education({ educations, img }) {
  const { content, user } = useContext(AppContext);
  return (
    <div className="edu-wrapper">
      <div>
        <h3>{content.education}</h3>
        <div className="edu-details">
          <Avatar avatarsize="1" src={img} />
          <div className="details">
            {educations?.map((education) => {
              return (
                <div key={education?._id}>
                  <p className="school">{education?.School}</p>
                  <p>{education?.Description}</p>
                  <p>{education?.Duration}</p>
                  <p>{education?.moreinfo}</p>
                </div>
              );
            })}
            {/* <p className="school">Addis Ababa University</p>
            <p>
              Bachelor's degree Field of study computer and information system
              security
            </p>
            <p>2013-2017</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;
