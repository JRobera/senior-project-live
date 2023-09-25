import React, { useContext, useState } from "react";
import "./ForgotPassword.css";
import axios from "axios";
import { AppContext } from "../context/AppContexts";
import { generateError, generatesuccess } from "../utility/Toasts";

function ForgotPassword() {
  const { content } = useContext(AppContext);
  const [resetEmail, setResetEmail] = useState("");
  const [sending, setSending] = useState(false);

  function handleChange(e) {
    const { value } = e.target;
    setResetEmail(value);
  }

  return (
    <div className="pusher">
      <div className="forgot-password-wrapper">
        <div className="main-form">
          <p className="forgot-password-header">{content.forgotpassword}?</p>
          <form className="forgot-password-form">
            <div className="input-wrapper">
              <input
                className="forgot-password-input"
                type="email"
                name="email"
                id="forgotemail"
                placeholder={content.email}
                onChange={handleChange}
                required
              />
            </div>

            <button
              className="signin-btn"
              onClick={(e) => {
                e.preventDefault();
                if (resetEmail) {
                  setSending(true);

                  axios
                    .post(`http://localhost:3005/forgot-password`, {
                      resetEmail: resetEmail,
                    })
                    .then((response) => {
                      generatesuccess(response.data);
                      setSending(false);
                    })
                    .catch((err) => {
                      generateError(err);
                      setSending(false);
                    });
                } else {
                  generateError("Email required");
                }
              }}
            >
              {sending ? `${content.sending}` : `${content.send}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
