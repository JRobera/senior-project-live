import React, { useState } from "react";
import "./NavIcon.css";

function NavIcon(props) {
  const [currentPage, setCurrentPage] = useState(false);

  return (
    <div
      className={currentPage ? "pages active-page" : "pages"}
      onClick={() => {
        setCurrentPage(true);
      }}
    >
      {/* <img className="icon" src={props.icon} alt="" /> */}
      {props.icon}
      <span className="icon-name">{props.iconName}</span>
    </div>
  );
}

export default NavIcon;
