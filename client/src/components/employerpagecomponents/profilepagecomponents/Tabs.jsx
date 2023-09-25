import React, { useContext, useEffect, useState } from "react";
import "./Tabs.css";
import axios from "axios";
import { AppContext } from "../../../context/AppContexts";

function Tabs(props) {
  const { handleSelectedTab, handleArticle, handlePost, handleJobPost, user } =
    props;
  const { content } = useContext(AppContext);

  const [active, setActive] = useState(`${content.profile}`);
  const tabs = [
    `${content.profile}`,
    `${content.myjobs}`,
    `${content.post}`,
    `${content.article}`,
  ];

  useEffect(() => {
    handleSelectedTab(active);
  }, [active]);

  // console.log(user?._id);
  return (
    <div className="tabs">
      {tabs.map((tab, i) => {
        return (
          <p
            key={i}
            className={`tab ${active === tab ? "active" : undefined}`}
            onClick={() => {
              setActive(tab);
              handleSelectedTab(active);
              if (tab === `${content.myjobs}`) {
                // axios
                //   .get(`http://127.0.0.1:3005/my-jobs/${user._id}`)
                //   .then((response) => {
                //     console.log(response.data);
                handleJobPost();
                // })
                // .catch((err) => {
                //   console.log(err.response.data);
                // });
              } else if (tab === `${content.post}`) {
                // axios
                //   .get(`http://127.0.0.1:3005/post/${user._id}`)
                //   .then((response) => {
                // console.log(response.data.Post_id);
                handlePost();
                // })
                // .catch((err) => {
                //   console.log(err.response.data);
                // });
              } else if (tab === `${content.article}`) {
                // axios
                //   .get(`http://127.0.0.1:3005/article/${user._id}`)
                //   .then((response) => {
                // console.log(response.data.Article_id);
                handleArticle();
                // })
                // .catch((err) => {
                //   console.log(err.response.data);
                // });
              }
            }}
          >
            {tab}
          </p>
        );
      })}
    </div>
  );
}

export default Tabs;
