import React, { useRef, useState, useEffect } from "react";

import { FiMoreHorizontal } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

function Notification() {
  const [showMore, setShowMore] = useState();

  const btnRef = useRef();
  useEffect(() => {
    const closeShowmore = (e) => {
      if (btnRef.current && !btnRef.current.contains(e.target)) {
        setShowMore(false);
      }
    };

    document.addEventListener("click", closeShowmore);
    return () => {
      document.removeEventListener("click", closeShowmore);
    };
  }, []);

  return (
    <div className="notification">
      <img className="notif-img" src="../images/profile.png" alt="" />
      <p className="notif-body">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium aut
        quae perspiciatis.Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Laudantium aut quae perspiciatis
      </p>
      <div
        className="more"
        ref={btnRef}
        onClick={() => {
          setShowMore(!showMore);
        }}
      >
        <FiMoreHorizontal size={"1.2rem"} />
      </div>

      {showMore && (
        <div className="more-popup">
          <p
            onClick={() => {
              console.log("Delete");
            }}
          >
            <RiDeleteBin6Line size={"1.2rem"} />
            Delete
          </p>
        </div>
      )}
    </div>
  );
}

export default Notification;
