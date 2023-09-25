import React, { useContext, useState } from "react";
import { AppContext } from "../../../../context/AppContexts";

function AddCertification({ handleNewCertification }) {
  const { content } = useContext(AppContext);
  const [newCertification, setNewCertification] = useState({
    name: "",
    duration: "",
    description: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setNewCertification((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleClick(e) {
    e.preventDefault();
    if (
      newCertification.name !== "" &&
      newCertification.duration !== "" &&
      newCertification.description !== ""
    ) {
      handleNewCertification(newCertification);
      setNewCertification({
        name: "",
        duration: "",
        description: "",
      });
    }
  }

  return (
    <div className="add-cer-form">
      <input
        type="text"
        name="name"
        value={newCertification.name}
        placeholder={content.addnewcertification}
        onChange={handleChange}
      />
      <input
        type="text"
        name="duration"
        value={newCertification.duration}
        placeholder={content.addduration}
        onChange={handleChange}
      />
      <textarea
        name="description"
        id=""
        rows="5"
        value={newCertification.description}
        placeholder={content.adddescription}
        onChange={handleChange}
      ></textarea>
      <button className="btn-add-cer" onClick={handleClick}>
        {content.add}
      </button>
    </div>
  );
}

export default AddCertification;
