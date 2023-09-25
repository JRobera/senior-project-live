import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";

function AddSkill({ handleNewSkill }) {
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
        placeholder="Add you skill"
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
