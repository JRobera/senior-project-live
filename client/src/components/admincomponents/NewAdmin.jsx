import React, { useState } from "react";
import "./NewAdmin.css";
import { GrClose } from "react-icons/gr";
import axios from "axios";
import { generatesuccess } from "../../utility/Toasts";

function NewAdmin({ handleShowNewAdminPopUp }) {
  const [newAdmin, setNewAdmin] = useState({ Name: "", Password: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setNewAdmin({ ...newAdmin, [name]: value });
  }

  function handleCreateAdmin() {
    axios
      .post("http://localhost:3005/new-admin", { newAdmin })
      .then((response) => {
        generatesuccess(response.data);
        handleShowNewAdminPopUp();
      });
  }

  return (
    <div className="admin-overlay">
      <div className="new-admin-wrapper">
        <span
          className="close-new-admin"
          onClick={() => {
            handleShowNewAdminPopUp();
          }}
        >
          {" "}
          <GrClose />{" "}
        </span>
        <div className="input-wrapper">
          <input
            className="signin-input"
            type="text"
            name="Name"
            onChange={handleChange}
            placeholder="New user name"
          />
        </div>
        <div className="input-wrapper">
          <input
            className="signin-input"
            type="password"
            name="Password"
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <button className="btn-add-admin" onClick={handleCreateAdmin}>
          Add
        </button>
      </div>
    </div>
  );
}

export default NewAdmin;
