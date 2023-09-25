import React, { useState } from "react";
import { Route } from "react-router-dom";
import "./AdminContainer.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import ManageUsers from "./ManageUsers";
import Analytics from "./Reported";
import NewAdmin from "./NewAdmin";
import DeleteAdmin from "./DeleteAdmin";

function AdminContainer() {
  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const [showNewAdminPopUp, setShowNewAdminPopUp] = useState(false);
  const [showDeleteAdminPopUp, setShowDeleteAdminPopUp] = useState(false);

  function handleSelectedTab(tab) {
    setSelectedTab(tab);
  }
  function handleShowNewAdminPopUp() {
    setShowNewAdminPopUp(!showNewAdminPopUp);
  }
  function handleShowDeleteAdminPopUp() {
    setShowDeleteAdminPopUp(!showDeleteAdminPopUp);
  }

  return (
    <div className="admin">
      <Navbar
        handleShowNewAdminPopUp={handleShowNewAdminPopUp}
        handleShowDeleteAdminPopUp={handleShowDeleteAdminPopUp}
      />
      <div className="admin-container">
        <Sidebar handleSelectedTab={handleSelectedTab} />
        <div className="main">
          {selectedTab === "Manage Users" ? (
            <ManageUsers />
          ) : selectedTab === "Reported" ? (
            <Analytics />
          ) : null}
        </div>
        {showNewAdminPopUp ? (
          <NewAdmin handleShowNewAdminPopUp={handleShowNewAdminPopUp} />
        ) : null}
        {showDeleteAdminPopUp ? (
          <DeleteAdmin
            handleShowDeleteAdminPopUp={handleShowDeleteAdminPopUp}
          />
        ) : null}
      </div>
    </div>
  );
}

export default AdminContainer;
