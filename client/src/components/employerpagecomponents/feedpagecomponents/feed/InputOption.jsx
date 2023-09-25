import React, { useContext } from "react";
import "./InputOption.css";
import { AppContext } from "../../../../context/AppContexts";

function InputOption({
  Icon,
  title,
  setlike,
  setcomment,
  sharepost,
  color,
  handleClick,
}) {
  const { content } = useContext(AppContext);
  return (
    <div
      className="inputOption"
      onClick={() => {
        if (title === `${content.photo}`) {
          handleClick();
        } else if (title === `${content.video}`) {
          handleClick();
        } else if (title === `${content.like}`) {
          setlike();
        } else if (title === `${content.comment}`) {
          setcomment();
        } else if (title === `${content.share}`) {
          sharepost();
        }
      }}
    >
      <Icon style={{ color }} />
      <p>{title}</p>
    </div>
  );
}

export default InputOption;
