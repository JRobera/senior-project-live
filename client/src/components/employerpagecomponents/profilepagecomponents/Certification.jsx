import React, { useContext } from "react";
import "./Certification.css";
import Avatar from "../../Avatar";
import { AppContext } from "../../../context/AppContexts";

function Certification({ certifications }) {
  const { content, user } = useContext(AppContext);
  return (
    <div className="cer-wrapper">
      <div>
        <h3>{content.certification}</h3>
        <div className="cer-details">
          <Avatar avatarsize="1" src={user?.u_pic} />
          <div className="details">
            {certifications?.map((certification) => {
              return (
                <div key={certification?._id}>
                  <p className="course-name">{certification?.Name}</p>
                  <p>{certification?.Description}</p>
                  <p>{certification?.Duration}</p>
                </div>
              );
            })}
            {/* <p className="course-name">UX/UI design course by Google</p>
            <p>cerifed UI design course</p>
            <p>2016-2017</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Certification;
