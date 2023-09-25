import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./EmployerSignIn.css";
import { AppContext } from "../../../context/AppContexts";
import jwt_decode from "jwt-decode";

function EmployerSignIn() {
  const { content, user, setUser, accessToken, setaccessToken } =
    useContext(AppContext);
  const [signinDetail, setSigninDetail] = useState({ Email: "", Password: "" });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setSigninDetail((prev) => {
      return { ...prev, [name]: value };
    });
  };

  let history = useNavigate();

  const redirect = () => {
    history("/emp/feed");
  };

  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

  return (
    <div className="pusher">
      <div className="sign-in-wrapper">
        <div className="main-form">
          <p className="sign-in-header">{content.signin}</p>
          <form className="sign-in-form">
            <div className="input-wrapper">
              <input
                className="signin-input"
                type="email"
                name="Email"
                id="signinemail"
                required
                value={signinDetail.Email}
                placeholder={content.email}
                onChange={handleChange}
              />
              {/* <label className="signin-label" htmlFor="signinemail">
                Email
              </label> */}
            </div>
            <div className="input-wrapper">
              <input
                className="signin-input"
                type="password"
                name="Password"
                id="signinpassword"
                required
                value={signinDetail.Password}
                placeholder={content.password}
                onChange={handleChange}
              />
              {/* <label className="signin-label" htmlFor="signinpassword">
                Password
              </label> */}
            </div>
            <p className="forgot-password">
              <Link to="/forgot-password">{content.forgotpassword}</Link>
            </p>

            <button
              className="signin-btn"
              onClick={async (e) => {
                e.preventDefault();
                const { Email, Password } = signinDetail;
                if (Email !== "" && Password !== "") {
                  await axios
                    .post(
                      `http://localhost:3005/employer/login`,
                      signinDetail,
                      {
                        withCredentials: true,
                      }
                    )
                    .then((result) => {
                      if (result.data.accessToken) {
                        setUser(jwt_decode(result.data.accessToken));
                        setaccessToken(result.data.accessToken);
                        redirect();
                        // console.dir("access Token " + accessToken);
                      } else {
                        console.log(result.data);
                        generateError(result.data);
                      }
                    })
                    .catch((err) => {
                      generateError(err.response.data);
                    });
                } else {
                  generateError("Email and Password required");
                }
              }}
            >
              {content.signin}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EmployerSignIn;
