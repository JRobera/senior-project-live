import axios from "axios";
import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import { generateError, generatesuccess } from "../../utility/Toasts";

function DeleteAdmin({ handleShowDeleteAdminPopUp }) {
  const [adminName, setAdminName] = useState("");

  function handleDeleteAdmin() {
    axios
      .post("http://localhost:3005/delete-admin", { adminName })
      .then((response) => {
        if (response) {
          generatesuccess(response.data);
          handleShowDeleteAdminPopUp();
        } else {
          generateError(response.data);
          handleShowDeleteAdminPopUp();
        }
      });
  }
  function handleChange(e) {
    const { value } = e.target;
    setAdminName(value);
  }
  return (
    <div className="admin-overlay">
      <div className="new-admin-wrapper">
        <span
          className="close-new-admin"
          onClick={() => {
            handleShowDeleteAdminPopUp();
          }}
        >
          {" "}
          <GrClose />{" "}
        </span>
        <div className="input-wrapper">
          <input
            className="signin-input"
            type="text"
            onChange={handleChange}
            placeholder="User name"
          />
        </div>
        <button className="btn-add-admin" onClick={handleDeleteAdmin}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeleteAdmin;
