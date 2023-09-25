import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { generateError, generatesuccess } from "../utility/Toasts";
import axios from "axios";
import { AppContext } from "../context/AppContexts";

function ResetPassword() {
  const { content } = useContext(AppContext);
  const [newPassword, setNewPassword] = useState({
    newpassword: "",
    confirmpassword: "",
  });

  const params = useParams();

  function handleChange(e) {
    const { name, value } = e.target;
    setNewPassword({ ...newPassword, [name]: value });
  }

  console.log(params);

  function handlePasswordReset(e) {
    e.preventDefault();
    if (newPassword.newpassword === newPassword.confirmpassword) {
      axios
        .post(
          `http://localhost:3005/reset-password/${params.token}/${params.id}`,
          {
            newpass: newPassword.newpassword,
            confpass: newPassword.confirmpassword,
          }
        )
        .then((response) => {
          generatesuccess(response.data);
          setNewPassword({
            newpassword: "",
            confirmpassword: "",
          });
        });
    } else {
      generateError("Password does not match");
    }
  }

  return (
    <div className="pusher">
      <div className="reset-password-wrapper">
        <div className="main-form">
          <p className="reset-password-header">{content.resetpassword}</p>
          <form className="reset-password-form">
            <div className="input-wrapper">
              <input
                className="reset-password-input"
                type="password"
                name="newpassword"
                placeholder={content.newpassword}
                value={newPassword.newpassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-wrapper">
              <input
                className="reset-password-input"
                type="password"
                name="confirmpassword"
                placeholder={content.confirmpassword}
                value={newPassword.confirmpassword}
                onChange={handleChange}
                required
              />
            </div>

            <button className="signin-btn" onClick={handlePasswordReset}>
              {content.changepassword}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
