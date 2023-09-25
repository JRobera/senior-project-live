import React from "react";
import "./EmployerNotificationContainer.css";
import EmployerNotification from "./EmployerNotification";
import ENavigation from "../ENavigation";
function EmployerNotificationContainer() {
  return (
    <>
      <ENavigation />
      <div className="notif-wrapper">
        <div className="notifications">
          <EmployerNotification />
          <EmployerNotification />
          <EmployerNotification />
        </div>
      </div>
    </>
  );
}

export default EmployerNotificationContainer;
