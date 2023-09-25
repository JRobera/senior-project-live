import React, { useState } from "react";
import "./Sidebar.css";

function Sidebar({ handleSelectedTab }) {
  const [active, setActive] = useState("");
  const tabs = ["Manage Users", "Reported"];

  return (
    <div className="sidebar">
      {tabs.map((tab, i) => {
        return (
          <div
            key={i}
            className={`mg-item ${active === tab ? "active-mg" : undefined}`}
            onClick={() => {
              if (tab === "Manage Users") {
                setActive(tab);
                handleSelectedTab(tab);
              } else if (tab === "Reported") {
                setActive(tab);
                handleSelectedTab(tab);
              }
            }}
          >
            <p>{tab}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Sidebar;
