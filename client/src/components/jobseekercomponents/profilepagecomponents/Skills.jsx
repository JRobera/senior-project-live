import React, { useContext } from "react";
import "./Skills.css";
import { AppContext } from "../../../context/AppContexts";

function Skills({ skills }) {
  const { content } = useContext(AppContext);
  return (
    <div className="skill-wrapper">
      <div>
        <h3>{content.skill}</h3>
        {skills?.map((skill, index) => {
          return <p key={index}>{skill}</p>;
        })}
        {/* <span
          onClick={() => {
            console.log("show all skills");
          }}
        >
          SHOW ALL
        </span> */}
      </div>
    </div>
  );
}

export default Skills;
