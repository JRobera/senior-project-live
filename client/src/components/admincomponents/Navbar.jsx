import React, { useContext, useState } from "react";
import "./Navbar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContexts";

function Navbar({ handleShowNewAdminPopUp, handleShowDeleteAdminPopUp }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { setUser } = useContext(AppContext);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };
  function handleCreatUser() {
    handleShowNewAdminPopUp();
  }
  function handleDeleteUser() {
    handleShowDeleteAdminPopUp();
  }
  let history = useNavigate();

  const redirect = () => {
    history("/");
  };

  return (
    <div className="navbar">
      <div className="logo">Logo</div>
      <div className="profile" onClick={toggleProfileMenu}>
        Profile
        <div className={`menu ${showProfileMenu ? "show" : ""}`}>
          <div className="item" onClick={handleCreatUser}>
            New Account
          </div>
          <div className="item" onClick={handleDeleteUser}>
            Delete Account
          </div>
          <div
            className="item"
            onClick={() => {
              axios
                .post(
                  "https://senior-project-live-api.onrender.com/admin/logout",
                  {},
                  { withCredentials: true }
                )
                .then(() => {});
              setUser({});
              redirect();
            }}
          >
            Log Out
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
