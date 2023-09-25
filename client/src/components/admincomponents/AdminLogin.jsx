import axios from "axios";
import React, { useContext, useState } from "react";
import { generateError } from "../../utility/Toasts";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContexts";
import jwt_decode from "jwt-decode";

function AdminLogin() {
  const { setUser, setaccessToken } = useContext(AppContext);
  const [admin, setAdmin] = useState({ Name: "", Password: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  }
  let history = useNavigate();

  const redirect = () => {
    history("/dashboard");
  };

  return (
    <div className="pusher">
      <div className="sign-in-wrapper">
        <div className="main-form">
          <p className="sign-in-header">Admin Login</p>

          <form action="" className="sign-in-form">
            <div className="input-wrapper">
              <input
                type="text"
                name="Name"
                className="signin-input"
                placeholder="User name"
                onChange={handleChange}
              />
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                name="Password"
                className="signin-input"
                id=""
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            <button
              className="signin-btn"
              onClick={(e) => {
                e.preventDefault();
                if (admin.Name !== "" && admin.Password !== "") {
                  axios
                    .post(
                      "http://localhost:3005/admin-login",
                      { admin },
                      {
                        withCredentials: true,
                      }
                    )
                    .then((response) => {
                      if (response.data.accessToken) {
                        setUser(jwt_decode(response.data.accessToken));
                        setaccessToken(response.data.accessToken);
                        redirect();
                      } else {
                        generateError(response.data);
                      }
                    })
                    .catch((err) => {
                      generateError(err);
                    });
                } else {
                  generateError("User name and Password required");
                }
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
