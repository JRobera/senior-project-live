import React, { useContext, useEffect, useRef, useState } from "react";
import "./PostForm.css";

import MultiStepProgressBar from "./MultiStepProgressBar";
import FirstForm from "./Multistep/FirstForm";
import SecondForm from "./Multistep/SecondForm";
import { AppContext } from "../../../context/AppContexts";
import axios from "axios";
import { GrClose } from "react-icons/gr";
import ThirdForm from "./Multistep/ThirdForm";
import Swal from "sweetalert2";

function JobPostingForm({ showModal, setShowModal, handleRefetchJoposts }) {
  const { content, user } = useContext(AppContext);
  const [page, setPage] = useState(0);
  const FormTitles = [
    `${content.paymentdetails}`,
    `${content.jobdescription}`,
    `${content.description}`,
  ];
  // const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    showModal
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
  }, [showModal]);

  // Check for paymentSuccess query parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentSuccessParam = urlParams.get("paymentSuccess");
    if (paymentSuccessParam === "true") {
      setPage(1);
    }
  }, []);

  // close modal
  const btnRef = useRef();
  const btnclose = useRef();
  // useEffect(() => {
  //   const closeShowmodal = (e) => {
  //     if (
  //       btnRef.current &&
  //       btnclose.current &&
  //       !btnRef.current.contains(e.target) &&
  //       !btnclose.current.contains(e.target)
  //     ) {
  //       setShowModal(false);
  //     }
  //   };

  //   document.addEventListener("click", closeShowmodal);
  //   return () => {
  //     document.removeEventListener("click", closeShowmodal);
  //   };
  // }, []);

  const [formData, setFormData] = useState({
    Job_title: "",
    Company_name: "",
    Job_description: "",
    Job_location: "",
    Salary_range: "",
    Employment_type: "",
    Work_type: "",
    Skills: [],
    newSkill: "",
    fname: "",
    lname: "",
    email: "",
    amount: "",
  });
  // -------------------
  const PostJob = async (e) => {
    const {
      Job_title,
      Company_name,
      Job_description,
      Job_location,
      Salary_range,
      Employment_type,
      Work_type,
      Skills,
      newSkill,
      fname,
      lname,
      email,
      amount,
    } = formData;
    e.preventDefault();
    try {
      const body = {
        Job_title,
        Company_name,
        Job_description,
        Job_location,
        Salary_range,
        Employment_type,
        Work_type,
        Skills,
        newSkill,
        fname,
        lname,
        email,
        amount,
      };
      await axios.post(
        `https://senior-project-live-api.onrender.com/postjob/${user?.u_id}`,
        body
      );
      // Here is where sweet alert will be instead of alert
      Swal.fire(
        "Job Posted!",
        "Your job has been posted successfully.",
        "success"
      );
      console.log(user.u_id);
      // Remove showModal and paymentSuccess query parameters from URL
      const url = new URL(window.location.href);
      url.searchParams.delete("showModal");
      url.searchParams.delete("paymentSuccess");
      window.history.pushState({}, "", url);
      // This code adds a few lines to the PostJob function that remove the showModal and paymentSuccess query parameters from the URL after the job is posted

      // TODO: I think here is where you will add the sweet alert
      // Close modal and refresh page
      setShowModal(false);
      // window.location.reload();
      handleRefetchJoposts();
    } catch (error) {
      alert("Error in posting job");
      console.log(error);
    }
  };
  // -------------------
  // const Postjob = async (e) => {
  //   e.preventDefault();

  //   const {
  //     Job_title,
  //     Company_name,
  //     Job_description,
  //     Job_location,
  //     Employment_type,
  //     Work_type,
  //     Skills,
  //     newSkill,
  //     fname,
  //     lname,
  //     email,
  //     amount,
  //   } = formData;

  //   sessionStorage.setItem("formData", JSON.stringify(formData));
  // };

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const PageDisplay = () => {
    if (page === 0) {
      return <SecondForm formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <FirstForm formData={formData} setFormData={setFormData} />;
    } else if (page === 2) {
      return <ThirdForm formData={formData} setFormData={setFormData} />;
    }
    // else {
    //   return <OtherInfo formData={formData} setFormData={setFormData} />;
    // }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="btn-openform"
        style={{ borderRadius: 20 }}
      >
        {content.postajobnow}
      </button>

      {showModal && (
        <div className="form" ref={btnRef}>
          <div className="progressbar">
            <div className="form__container">
              <div
                className="close-modal"
                ref={btnclose}
                onClick={() => setShowModal(!showModal)}
              >
                <GrClose />
              </div>
              <MultiStepProgressBar steps={FormTitles} currentStep={page + 1} />

              <div className="header">
                <h1>{FormTitles[page]}</h1>
              </div>

              <div className="body">{PageDisplay()}</div>

              <div className="footer">
                {page !== 0 && (
                  <button
                    className="step-button"
                    disabled={page === 1}
                    onClick={() => {
                      setPage((prevPage) => prevPage - 1);
                    }}
                  >
                    Prev
                  </button>
                )}

                {page === 0 ? null : (
                  <button
                    className="step-button"
                    onClick={(e) => {
                      if (page === FormTitles.length - 1) {
                        // TODO: here is where you will submit the form data to an api
                        // alert("Form Submitted");
                        PostJob(e);
                        console.log(formData);
                      } else {
                        nextPage();
                      }
                    }}
                  >
                    {page === FormTitles.length - 1 ? "Post Job" : "Next"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default JobPostingForm;
