import React, { useContext } from "react";
import "./About.css";
import { AppContext } from "../../../context/AppContexts";

function About({ about }) {
  const { content } = useContext(AppContext);
  return (
    <div className="about-wrapper">
      <div>
        <h3>{content.about}</h3>
        <p>{about}</p>
        {/* <span
          onClick={() => {
            console.log("see more");
          }}
        >
          SEE MORE
        </span> */}
      </div>
    </div>
  );
}

export default About;
