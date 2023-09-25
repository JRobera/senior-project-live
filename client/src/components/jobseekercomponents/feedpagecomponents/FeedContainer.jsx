import React from "react";
import Navigation from "../../Navigation";
import LeftBar from "./sideBarLeft/LeftBar";
import RightBar from "./sideBarRight/RightBar";

import "./feedContainer.css";
import Feed from "./feed/Feed";

function FeedContainer() {
  return (
    <>
      <Navigation />
      <div className="feed-wrapper">
        {/* <LeftBar /> */}
        <Feed />
        <RightBar />
      </div>
    </>
  );
}

export default FeedContainer;
