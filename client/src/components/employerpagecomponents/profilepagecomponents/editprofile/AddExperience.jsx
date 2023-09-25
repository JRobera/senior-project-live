import React, { useState } from "react";

function AddExperience({ handleNewExperience }) {
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    description: "",
    duration: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setNewExperience((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function handleClick(e) {
    e.preventDefault();

    if (
      newExperience.title !== "" &&
      newExperience.company !== "" &&
      newExperience.description !== "" &&
      newExperience.duration !== ""
    ) {
      handleNewExperience(newExperience);
      setNewExperience({
        title: "",
        company: "",
        description: "",
        duration: "",
      });
    }
  }
  return (
    <div className="add-exp-form">
      <input
        type="text"
        name="title"
        value={newExperience.title}
        placeholder="Add your job title"
        onChange={handleChange}
      />
      <input
        type="text"
        name="company"
        value={newExperience.company}
        placeholder="Add company"
        onChange={handleChange}
      />
      <textarea
        name="description"
        id=""
        rows="5"
        value={newExperience.description}
        placeholder="Add description"
        onChange={handleChange}
      ></textarea>
      <input
        type="text"
        name="duration"
        value={newExperience.duration}
        placeholder="Add duration"
        onChange={handleChange}
      />
      <button className="btn-add-exp" onClick={handleClick}>
        Add
      </button>
    </div>
  );
}

export default AddExperience;
