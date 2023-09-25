import React from "react";
import Navigation from "../../Navigation";
import Notification from "./Notification";
import "./NotificationContainer.css";

function NotificationContainer() {
  return (
    <>
      <Navigation />
      <div className="notif-wrapper">
        <div className="notifications">
          <Notification />
          <Notification />
          <Notification />
        </div>
      </div>
    </>
  );
}

export default NotificationContainer;
