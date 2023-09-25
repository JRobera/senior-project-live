import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../context/AppContexts";

function AddExperience({ handleNewExperience, getExpDetail }) {
  const { content } = useContext(AppContext);
  const [newExperience, setNewExperience] = useState({
    _id: "",
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
        _id: "",
        title: "",
        company: "",
        description: "",
        duration: "",
      });
    }
  }

  useEffect(() => {
    setNewExperience(getExpDetail);
  }, [getExpDetail]);

  return (
    <div className="add-exp-form">
      <input
        type="text"
        name="title"
        value={newExperience.title}
        placeholder={content.addyourjobtitle}
        onChange={handleChange}
      />
      <input
        type="text"
        name="company"
        value={newExperience.company}
        placeholder={content.addcompany}
        onChange={handleChange}
      />
      <textarea
        name="description"
        id=""
        rows="5"
        value={newExperience.description}
        placeholder={content.adddescription}
        onChange={handleChange}
      ></textarea>
      <input
        type="text"
        name="duration"
        value={newExperience.duration}
        placeholder={content.addduration}
        onChange={handleChange}
      />
      <button className="btn-add-exp" onClick={handleClick}>
        {content.addexperience}
      </button>
    </div>
  );
}

export default AddExperience;
