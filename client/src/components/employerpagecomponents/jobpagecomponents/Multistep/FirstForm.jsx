import React, { useContext, useEffect, useState } from "react";
import "../PostForm.css";
import { AppContext } from "../../../../context/AppContexts";

function FirstForm({ formData, setFormData }) {
  const { content } = useContext(AppContext);
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [employmentType, setemploymentType] = useState("");
  const [workType, setWorkType] = useState("");

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  const handleSkillChange = (e) => {
    setNewSkill(e.target.value);
  };

  const handleSkillAdd = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const handleSkillRemove = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send form data to server
  };

  useEffect(() => {
    setFormData({ ...formData, Skills: skills });
  }, [skills]);
  const [showModal, setShowModal] = useState(false);

  return (
    // <div>
    // <form onSubmit={handleSubmit}>
    //   <div className="job-post-input-wrapper">
    //     <label id="label-id" htmlFor="jobTitle">
    //       Job Title
    //     </label>
    //     <input
    //       type="text"
    //       id="job-title"
    //       value={formData.Job_title}
    //       // TODO: ...FORMDATA, jobTitle: e.target.value
    //       onChange={(e) =>
    //         setFormData({ ...formData, Job_title: e.target.value })
    //       }
    //       required
    //       placeholder="Add the title you are hiring for"
    //     />
    //   </div>

    //   <div className="job-post-input-wrapper">
    //     <label id="label-id" htmlFor="companyName">
    //       Company Name
    //     </label>
    //     <input
    //       type="text"
    //       id="company-name"
    //       value={formData.Company_name}
    //       placeholder="Add your company name"
    //       onChange={(e) =>
    //         setFormData({ ...formData, Company_name: e.target.value })
    //       }
    //       required
    //     />
    //   </div>

    //   <div className="job-post-input-wrapper">
    //     <label id="label-id" htmlFor="jobDescription">
    //       Job Description
    //     </label>
    //     <ReactQuill
    //       placeholder="Add description"
    //       theme="snow"
    //       modules={modules}
    //       formats={formats}
    //       onChange={(content, delta, source, editor) =>
    //         setFormData({ ...formData, Job_description: content })
    //       }
    //     />
    //     {/* <textarea
    //       id="job-description"
    //       value={formData.jobDescription}
    //       onChange={(e) =>
    //         setFormData({ ...formData, jobDescription: e.target.value })
    //       }
    //       style={{ resize: "vertical" }}
    //     ></textarea> */}
    //   </div>

    //   <div className="job-post-input-wrapper">
    //     <label id="label-id" htmlFor="jobLocation">
    //       Job Location
    //     </label>
    //     <input
    //       type="text"
    //       id="job-location"
    //       value={formData.Job_location}
    //       onChange={(e) =>
    //         setFormData({ ...formData, Job_location: e.target.value })
    //       }
    //     />
    //   </div>

    //   <div className="job-post-input-wrapper">
    //     <label id="label-id" htmlFor="jobType">
    //       Employment Type
    //     </label>
    //     <select
    //       id="employmentType"
    //       value={formData.Employment_type}
    //       onChange={(e) =>
    //         setFormData({ ...formData, Employment_type: e.target.value })
    //       }
    //     >
    //       <option value="">Select employment type</option>
    //       <option value="full-time">Full-time</option>
    //       <option value="part-time">Part-time</option>
    //       <option value="contract">Contract</option>
    //     </select>
    //   </div>

    //   <div className="job-post-input-wrapper">
    //     <label id="label-id" htmlFor="jobType">
    //       Workplace Type
    //     </label>
    //     <select
    //       id="WorkType"
    //       value={formData.Work_type}
    //       onChange={(e) =>
    //         setFormData({ ...formData, Work_type: e.target.value })
    //       }
    //     >
    //       <option value="">Select work type</option>
    //       <option value="on-site">On-site</option>
    //       <option value="remote">Remote</option>
    //       <option value="hybrid">hybrid</option>
    //     </select>
    //   </div>

    //   <div className="skills-section">
    //     <label id="label-id" htmlFor="skills">
    //       Skills
    //     </label>
    //     <div className="skills-list">
    //       {skills.map((skill) => (
    //         <div key={skill} className="skill-tag">
    //           <span>{skill}</span>
    //           <button
    //             type="button"
    //             onClick={() => handleSkillRemove(skill)}
    //             className="remove-skill-button"
    //           >
    //             &times;
    //           </button>
    //         </div>
    //       ))}
    //     </div>
    //     <input
    //       type="text"
    //       id="skills"
    //       value={newSkill}
    //       onChange={handleSkillChange}
    //       placeholder="Add a skill"
    //       onKeyDown={(e) => {
    //         if (e.key === "Enter") {
    //           e.preventDefault();
    //           handleSkillAdd();
    //         }
    //       }}
    //     />
    //   </div>
    // </form>
    <form onSubmit={handleSubmit}>
      <div className="job-post-input-wrapper">
        <label id="label-id" htmlFor="jobTitle">
          {content.jobtitle}
        </label>
        <input
          type="text"
          id="job-title"
          value={formData.Job_title}
          // TODO: ...FORMDATA, jobTitle: e.target.value
          onChange={(e) =>
            setFormData({ ...formData, Job_title: e.target.value })
          }
          required
          placeholder={content.addthetitleyouarehiringfor}
        />
      </div>

      <div className="job-post-input-wrapper">
        <label id="label-id" htmlFor="companyName">
          {content.companyname}
        </label>
        <input
          type="text"
          id="company-name"
          value={formData.Company_name}
          placeholder={content.addyourcompanyname}
          onChange={(e) =>
            setFormData({ ...formData, Company_name: e.target.value })
          }
          required
        />
      </div>

      <div className="job-post-input-wrapper">
        <label id="label-id" htmlFor="jobLocation">
          {content.joblocation}
        </label>
        <input
          type="text"
          id="job-location"
          value={formData.Job_location}
          placeholder={content.joblocation}
          onChange={(e) =>
            setFormData({ ...formData, Job_location: e.target.value })
          }
          required
        />
      </div>

      <div className="job-post-input-wrapper">
        <label id="label-id" htmlFor="job-salary">
          {content.jobsalary}
        </label>
        <input
          type="text"
          id="job-salary"
          value={formData.Salary_range}
          placeholder={content.jobsalaryrange}
          onChange={(e) =>
            setFormData({ ...formData, Salary_range: e.target.value })
          }
          required
        />
      </div>

      <div className="job-post-input-wrapper">
        <label id="label-id" htmlFor="jobType">
          {content.employmenttype}
        </label>
        <select
          id="employmentType"
          value={formData.Employment_type}
          onChange={(e) =>
            setFormData({ ...formData, Employment_type: e.target.value })
          }
        >
          <option value="">{content.selectemploymenttype}</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      <div className="job-post-input-wrapper">
        <label id="label-id" htmlFor="jobType">
          {content.workplace}
        </label>
        <select
          id="WorkType"
          value={formData.Work_type}
          onChange={(e) =>
            setFormData({ ...formData, Work_type: e.target.value })
          }
        >
          <option value="">{content.selectworktype}</option>
          <option value="on-site">On-site</option>
          <option value="remote">Remote</option>
          <option value="hybrid">hybrid</option>
        </select>
      </div>

      <div className="skills-section">
        <label id="label-id" htmlFor="skills">
          {content.skill}
        </label>
        <div className="skills-list">
          {skills.map((skill) => (
            <div key={skill} className="skill-tag">
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleSkillRemove(skill)}
                className="remove-skill-button"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          id="skills"
          value={newSkill}
          onChange={handleSkillChange}
          placeholder={content.addskill}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSkillAdd();
            }
          }}
        />
      </div>
    </form>
  );
}

export default FirstForm;
