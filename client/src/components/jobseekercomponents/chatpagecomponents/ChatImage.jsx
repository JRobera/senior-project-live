import React, { useEffect, useState } from "react";

function ChatImage(props) {
  const [imageSrc, setImageSrc] = useState("");
  useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(props.blob);
    reader.onloadend = function () {
      setImageSrc(reader.result);
    };
  }, [props.blob]);
  return (
    <img
      style={{ width: 100, height: 150 }}
      src={imageSrc}
      alt={props.fileName}
    />
  );
}

export default ChatImage;
