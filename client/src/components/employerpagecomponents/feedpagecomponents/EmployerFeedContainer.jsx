import React from "react";
import ENavigation from "../ENavigation";
import LeftBar from "./sideBarLeft/LeftBar";
import RightBar from "./sideBarRight/RightBar";

import "./EmployerFeedContainer.css";
import Feed from "./feed/Feed";

function FeedContainer() {
  return (
    <>
      <ENavigation />
      <div className="feed-wrapper">
        {/* <LeftBar /> */}
        <Feed />
        <RightBar />
      </div>
    </>
  );
}

export default FeedContainer;
