import React from "react";
import "./leftbar.css";
// import photo1 from "public/feed/photo1";

function Sidebar() {
  return (
    <div className="widgets">
      <div className="widget__group">
        <div className="title__wrapper">
          <h5>Groups</h5>
          <h5 className="edit-group-list">Edit List</h5>
        </div>

        <div className="widgetData">
          <div className="widgetData__container">
            <img src="/feed/photo1.jpg" alt="" />
            <div className="widgetData__title">
              <span>This is group name</span>
            </div>
          </div>
        </div>
        <div className="widgetData">
          <div className="widgetData__container">
            <img src="/feed/photo1.jpg" alt="" />
            <div className="widgetData__title">
              <span>Abcd</span>
            </div>
          </div>
        </div>
        <h5 className="bottom__title">Show All(8)</h5>
      </div>
    </div>
  );
}

export default Sidebar;
