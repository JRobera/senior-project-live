import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../context/AppContexts";

function AddEducation({ handleNewEducation, getEduDetail }) {
  const { content } = useContext(AppContext);
  const [newEducation, setNewEducation] = useState({
    _id: "",
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
        _id: "",
        school: "",
        description: "",
        duration: "",
      });
    }
  }

  useEffect(() => {
    setNewEducation(getEduDetail);
  }, [getEduDetail]);

  return (
    <div className="add-edu-form">
      <input
        type="text"
        name="school"
        value={newEducation.school}
        placeholder={content.addschoolorinstitution}
        onChange={handleChange}
      />
      <textarea
        name="description"
        value={newEducation.description}
        id=""
        rows="5"
        placeholder={content.adddescriptione}
        onChange={handleChange}
      ></textarea>
      <input
        type="text"
        name="duration"
        value={newEducation.duration}
        placeholder={content.addduratione}
        onChange={handleChange}
      />
      <button className="btn-add-edu" onClick={handleClick}>
        {content.addeducation}
      </button>
    </div>
  );
}

export default AddEducation;
