import React, { useContext, useState } from "react";
import "./Input.css";
import { AppContext } from "../../../context/AppContexts";

function Input(props) {
  const [input, setInput] = useState("");

  const { setSignUpInfo } = useContext(AppContext);

  return (
    <div className="custom-input">
      <input
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        value={input}
        onChange={(e) => {
          const { name, value, checked } = e.target;

          setInput(value);
          setSignUpInfo((prev) => {
            if (name === "consent") {
              return { ...prev, [name]: checked };
            } else {
              return { ...prev, [name]: value };
            }
          });
          // console.log(name == "consent" && checked);
        }}
      />
    </div>
  );
}

export default Input;
