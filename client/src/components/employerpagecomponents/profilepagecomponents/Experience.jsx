import React, { useContext } from "react";
import "./Experience.css";
import Avatar from "../../Avatar";
import { AppContext } from "../../../context/AppContexts";

function Experience({ experiences }) {
  const { user } = useContext(AppContext);
  return (
    <div className="exp-wrapper">
      <div>
        <h3>Experience</h3>
        <div className="exp-details">
          <Avatar avatarsize="1" src={user?.u_pic} />
          <div className="details">
            {experiences?.map((experience) => {
              return (
                <div key={experience?._id}>
                  <p className="title">{experience?.Title}</p>
                  <p className="type">{experience?.Company}</p>
                  <p className="time">{experience?.Duration}</p>
                  <p className="exp-description">{experience?.Description}</p>
                </div>
              );
            })}
            {/* <p className="title">Freelance UX/UI designer</p>
            <p className="type">Self Employed</p>
            <p className="time">Jun 2016-Present</p>
            <p className="exp-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore,
              perferendis praesentium voluptatibus libero pariatur cupiditate
              aliquid placeat aliquam tempora fugiat!
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Experience;
