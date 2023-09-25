import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContexts";
import "./EmployerBtnCustome.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { generateError } from "../../../utility/Toasts";

const btnstyle = [
  "btn-outline-one",
  "btn-outline-two",
  "btn-filled-one",
  "btn-filled-two",
];

const hoverstyleoutline = {
  backgroundColor: "rgb(232,169,1)",
  color: "transparent",
};
const hoverstylefilled = {
  backgroundColor: "transparent",
  color: "rgb(232,169,1)",
};

function EmployerBtnCustome(props) {
  const [isMouseOver, setMouseOver] = useState(false);
  const { content, user, setUser, signUpInfo } = useContext(AppContext);

  function handleMouseOver() {
    setMouseOver(true);
  }
  function handleMouseOut() {
    setMouseOver(false);
  }

  let history = useNavigate();

  const redirect = () => {
    history("/emp/feed");
  };

  // useEffect(() => {
  //   // console.log(userd);
  // }, [user]);
  return (
    <button
      className={btnstyle[props.btnstyle]}
      disabled={props.active}
      name={props.name}
      id={props.id}
      style={
        isMouseOver
          ? props.name === `${content.employer}` ||
            props.name === `${content.signup}`
            ? hoverstylefilled
            : hoverstyleoutline
          : null
      }
      onClick={async (e) => {
        e.preventDefault();
        if (e.target.name === `${content.signup}`) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const isValidEmail = emailRegex.test(signUpInfo?.Email);
          if (signUpInfo?.Name !== "") {
            if (isValidEmail) {
              // console.log(signUpInfo);
              if (signUpInfo?.Password !== "") {
                if (signUpInfo?.Password.length > 4) {
                  if (signUpInfo.consent) {
                    console.log("sign up");
                    axios
                      .post(
                        "http://localhost:3005/sign-up/employer",
                        signUpInfo,
                        {
                          withCredentials: true,
                        }
                      )
                      .then((res) => {
                        console.log(res.data);
                        setUser(jwt_decode(res.data.accessToken));
                        redirect();
                        console.log(user);
                      })
                      .catch((err) => {
                        console.log(err);
                        generateError(err);
                      });
                  } else {
                    generateError(
                      "You have to agree to the terms and conditions"
                    );
                  }
                } else {
                  generateError("Password must be more than four charcters");
                }
              } else {
                generateError("Password required");
              }
            } else {
              generateError("Invalid Email Address");
            }
          } else {
            generateError("Name is required");
          }
        } else if (e.target.name === "Sign up with Google") {
          console.log("You clicked " + e.target.name);
        } else if (e.target.name === "Join now") {
          console.log("You clicked " + e.target.name);
        } else if (e.target.name === "Sign In") {
          console.log("You clicked " + e.target.name);
        }
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <Link to={props.path}>{props.name}</Link>
    </button>
  );
}

export default EmployerBtnCustome;
