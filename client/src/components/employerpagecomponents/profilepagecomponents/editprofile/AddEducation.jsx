import React, { useState } from "react";

function AddEducation({ handleNewEducation }) {
  const [newEducation, setNewEducation] = useState({
    school: "",
    description: "",
    duration: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setNewEducation((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleClick(e) {
    e.preventDefault();
    if (
      newEducation.school !== "" &&
      newEducation.description !== "" &&
      newEducation.duration !== ""
    ) {
      handleNewEducation(newEducation);
      setNewEducation({
        school: "",
        description: "",
        duration: "",
      });
    }
  }

  return (
    <div className="add-edu-form">
      <input
        type="text"
        name="school"
        value={newEducation.school}
        placeholder="Add School or Institution"
        onChange={handleChange}
      />
      <textarea
        name="description"
        value={newEducation.description}
        id=""
        rows="5"
        placeholder="Add description degree, masters..."
        onChange={handleChange}
      ></textarea>
      <input
        type="text"
        name="duration"
        value={newEducation.duration}
        placeholder="Add duration 2012-2015"
        onChange={handleChange}
      />
      <button className="btn-add-edu" onClick={handleClick}>
        Add Education
      </button>
    </div>
  );
}

export default AddEducation;
