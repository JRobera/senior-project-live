import React, { useContext, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { AppContext } from "../../../../context/AppContexts";

function AddSkill({ handleNewSkill }) {
  const { content } = useContext(AppContext);
  const [newSkill, setNewSkill] = useState("");

  function handleChange(e) {
    const { value } = e.target;
    setNewSkill(value);
  }
  function handleClick(e) {
    e.preventDefault();
    if (newSkill !== "") {
      handleNewSkill(newSkill);
      setNewSkill("");
    }
  }
  return (
    <div className="add-skill-input">
      <input
        type="text"
        placeholder={content.addskill}
        value={newSkill}
        onChange={handleChange}
      />
      <button onClick={handleClick}>
        <GrAdd />
      </button>
    </div>
  );
}

export default AddSkill;
