import React, { useContext, useState } from "react";
import "./ApplicationFormModal.css";
import axios from "axios";
import { AppContext } from "../../../context/AppContexts";
import { generateError, generatesuccess } from "../../../utility/Toasts";
import Swal from "sweetalert2";

export default function ApplicationFormModal({ jobId, closeModal }) {
  const { user } = useContext(AppContext);
  const [resume, setResume] = useState(null);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("Resume", resume);
    setIsSubmiting(true);
    axios
      .post(
        `https://senior-project-live-api.onrender.com/upload/resume/${jobId}/${user?.u_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        generatesuccess(response);
        setIsSubmiting(false);
        Swal.fire("Applied!", "Application Submited Successfully.", "Success");
        closeModal();
      })
      .catch((err) => {
        generateError(err);
      });
    // Handle form submission here
    // You can use the state variables to get the form data
    // and do something with it, like send it to a server
    // or display it in a message to the user
  };

  const handleFileChange = (event) => {
    setResume(event.target.files[0]);
  };

  return (
    <div className="application-form-modal">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h2>Easy Apply</h2>
          <label htmlFor="resume" className="form__labels">
            Resume:
          </label>
          <input
            className="form__inputs"
            type="file"
            id="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            required
            placeholder="Enter first name"
          />
          <div className="modal-actions">
            <button type="submit">
              {isSubmiting ? "Submiting..." : "Submit"}
            </button>
            <button type="button" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
