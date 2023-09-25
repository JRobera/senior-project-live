import React, { useContext, useEffect, useState } from "react";
import "./Tabs.css";
import axios from "axios";
import { AppContext } from "../../../context/AppContexts";

function Tabs(props) {
  const { content } = useContext(AppContext);
  const { handleSelectedTab, handleArticle, handlePost, user } = props;
  const [active, setActive] = useState(`${content.profile}`);
  // const { user } = useContext(AppContext);
  const tabs = [`${content.profile}`, `${content.post}`, `${content.article}`];

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
              if (tab === `${content.profile}`) {
                console.log(tab);
                // axios
                //   .get(`http://127.0.0.1:3005/profile/${user._id}`)
                //   .then((response) => {
                //     console.log(response);
                //   })
                //   .catch((err) => {
                //     console.log(err.response.data);
                //   });
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
