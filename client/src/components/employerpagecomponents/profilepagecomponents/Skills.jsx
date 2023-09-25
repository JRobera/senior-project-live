import React from "react";
import "./Skills.css";

function Skills({ skills }) {
  // console.log(skills);
  return (
    <div className="skill-wrapper">
      <div>
        <h3>Skills</h3>
        {skills?.map((skill, index) => {
          return <p key={index}>{skill}</p>;
        })}
        <span
          onClick={() => {
            console.log("show all skills");
          }}
        >
          SHOW ALL
        </span>
      </div>
    </div>
  );
}

export default Skills;
