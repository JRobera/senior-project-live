import React, { useContext, useEffect } from "react";
import "./HomeContainer.css";
import BtnCustome from "./BtnCustome";
import HomeNavigation from "./HomeNavigation";
import Input from "./Input";
import jwt_decode from "jwt-decode";
import { AppContext } from "../../../context/AppContexts";
import { Link } from "react-router-dom";
import axios from "axios";

function HomeContainer() {
  const { content, signUpInfo, setSignUpInfo, user, setUser } =
    useContext(AppContext);

  function handleCallbackResponse(response) {
    // console.log("Encoded JWT ID token: " + response.credential);
    // setUser(jwt_decode(response.credential));
    console.log(jwt_decode(response.credential));
    let googleResponse = jwt_decode(response.credential);
    setSignUpInfo((prev) => {
      return {
        ...prev,
        ...{
          Name: googleResponse.name,
          Email: googleResponse.email,
          Picture: googleResponse.picture,
        },
      };
    });
    axios
      .post("http://localhost:3005/google-sign-in", signUpInfo, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(jwt_decode(res.data.accessToken));
      });
  }

  // useEffect(() => {
  //   /* global google */
  //   google.accounts.id.initialize({
  //     client_id:
  //       "82965130062-d8676tk1ho6porujuq0gd7hfpof6md26.apps.googleusercontent.com",
  //     callback: handleCallbackResponse,
  //   });

  //   google.accounts.id.renderButton(document.getElementById("signInGoogle"), {
  //     theme: "outline",
  //     size: "large",
  //   });
  // }, []);

  return (
    <>
      <HomeNavigation />
      <div className="home-wrapper">
        <div className="col-one">
          <form>
            <p className="home-page-header">{content.welcome}</p>
            <Input type="text" name="Name" placeholder={content.name} />
            <Input type="email" name="Email" placeholder={content.email} />
            <Input
              type="password"
              name="Password"
              placeholder={content.password}
            />
            <div className="consent-check">
              <Input type="checkbox" name="consent" placeholder="consent" />
              <p>{content.consent}</p>
            </div>
            <BtnCustome
              // active={
              //   !signUpInfo?.Email ||
              //   !signUpInfo?.Password ||
              //   !signUpInfo?.consent
              //     ? true
              //     : false
              // }
              name={content.signup}
              btnstyle="3"
            />
            <hr />
            <div
              className="g-signin2"
              data-onsuccess="onSignIn"
              id="signInGoogle"
            ></div>
            {/* <BtnCustome
              name={content.signupgoogle}
              id="signInGoogle"
              btnstyle="1"
            /> */}
            <div className="sign-in-option">
              <p>{content.alreadregisterd}</p>{" "}
              <p>
                <Link to="/signin">{content.signin}</Link>
              </p>
            </div>
          </form>
        </div>
        <div className="col-two">
          <img src="./images/online-job-search.png" alt="" />
        </div>
      </div>
    </>
  );
}

export default HomeContainer;
