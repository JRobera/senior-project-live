import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../context/AppContexts";

function AddCertification({ handleNewCertification, getCerDetail }) {
  const { content } = useContext(AppContext);
  const [newCertification, setNewCertification] = useState({
    _id: "",
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
        _id: "",
        name: "",
        duration: "",
        description: "",
      });
    }
  }

  useEffect(() => {
    setNewCertification(getCerDetail);
  }, [getCerDetail]);

  return (
    <div className="add-cer-form">
      <input
        type="text"
        name="name"
        value={newCertification.name}
        placeholder={content.addcertificationname}
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
