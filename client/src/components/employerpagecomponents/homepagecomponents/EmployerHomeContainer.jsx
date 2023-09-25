import React, { useContext, useEffect } from "react";
import "./EmployerHomeContainer.css";
import EmployerHomeNavigation from "./EmployerHomeNavigation";
import EmployerInput from "./EmployerInput";
import EmployerBtnCustome from "./EmployerBtnCustome";
import jwt_decode from "jwt-decode";
import { AppContext } from "../../../context/AppContexts";
import { Link } from "react-router-dom";

function EmployerHomeContainer() {
  const { content, signUpInfo, user, setUser } = useContext(AppContext);

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    setUser(jwt_decode(response.credential));
    console.log(user);
  }

  // useEffect(() => {
  //   /* global google */
  //   google.accounts.id.initialize({
  //     client_id:
  //       "82965130062-2d4aphako27ol6hsauo55ffo8bret3ov.apps.googleusercontent.com",
  //     callback: handleCallbackResponse,
  //   });

  //   google.accounts.id.renderButton(document.getElementById("signInGoogle"), {
  //     theme: "outline",
  //     size: "large",
  //   });
  // }, []);

  return (
    <>
      <EmployerHomeNavigation />
      <div className="home-wrapper">
        <div className="col-one">
          <form>
            <p className="home-page-header">{content.welcome}</p>
            <EmployerInput
              type="text"
              name={"Name"}
              placeholder={content.name}
            />
            <EmployerInput
              type="email"
              name={"Email"}
              placeholder={content.email}
            />
            <EmployerInput
              type="password"
              name={"Password"}
              placeholder={content.password}
            />
            <div className="consent-check">
              <EmployerInput
                type="checkbox"
                name={"consent"}
                placeholder="consent"
              />
              <p>{content.consent}</p>
            </div>
            <EmployerBtnCustome
              // active={
              //   !signUpInfo?.Email ||
              //   !signUpInfo?.Password ||
              //   !signUpInfo?.consent
              //     ? true
              //     : false
              // }
              name={content.signup}
              btnstyle="3"
              path={null}
            />
            <hr />
            {/* <EmployerBtnCustome
              name={content.signupgoogle}
              // id="signInGoogle"
              btnstyle="1"
            /> */}
            <div className="sign-in-option">
              <p>{content.alreadregisterd}</p>{" "}
              <p>
                <Link to="/emp/signin">{content.signin}</Link>
              </p>
            </div>
          </form>
        </div>
        <div className="col-two">
          {/* <img src="./images/online-job-search.png" alt="" /> */}
        </div>
      </div>
    </>
  );
}

export default EmployerHomeContainer;
