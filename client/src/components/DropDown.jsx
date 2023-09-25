import React, { useContext, useEffect, useState } from "react";
import "./DropDown.css";
import { AppContext } from "../context/AppContexts";
export default function DropDown({ handlefilter }) {
  const { content } = useContext(AppContext);
  const [selected, setSelected] = useState(`${content.post}`);
  const [isdroped, setIsDroped] = useState(false);

  const categories = [
    `${content.post}`,
    `${content.article}`,
    `${content.jobseeker}`,
    `${content.employer}`,
    `${content.jobpost}`,
  ];

  function handleSelect(cate) {
    setSelected(cate);
  }
  useEffect(() => {
    handlefilter(selected);
  }, [selected]);
  return (
    <div className="dropdown-wrapper">
      <div
        className="selectore"
        onClick={() => {
          setIsDroped(!isdroped);
        }}
      >
        {selected}
      </div>
      <div
        className="dropdown"
        style={
          isdroped
            ? {
                overflow: "visible",
                height: "fit-content",
                border: "1px solid lightgray",
              }
            : null
        }
      >
        {categories.map((category, i) => {
          return (
            <ListItem
              key={i}
              item={category}
              setSelected={handleSelect}
              setdrop={setIsDroped}
            />
          );
        })}
      </div>
    </div>
  );
}

function ListItem({ item, setSelected, setdrop }) {
  return (
    <button
      value={item}
      onClick={(e) => {
        e.preventDefault();
        setSelected(e.target.value);
        setdrop(false);
        // console.log(e.target.value);
      }}
    >
      {item}
    </button>
  );
}
