import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./FoundArticle.css";
import "react-quill/dist/quill.core.css";
import Avatar from "./components/Avatar";
import Navigation from "./components/Navigation";
import ENavigation from "./components/employerpagecomponents/ENavigation";
import { AppContext } from "./context/AppContexts";

function FoundArticle() {
  const [article, setArticle] = useState();
  const { user } = useContext(AppContext);
  const params = useParams();

  const zarticle = useRef();
  // feach data onload
  useEffect(() => {
    axios
      .get(
        `https://senior-project-live-api.onrender.com/found/article/${params.id}`
      )
      .then((response) => {
        if (response) {
          setArticle(response.data);
        }
      });
  }, [params?.id]);

  //   inject data to element
  useEffect(() => {
    const element = zarticle.current;
    element.innerHTML = article?.Article_content;
  }, [article]);

  return (
    <div className="found-a ql-editor">
      {user?.u_isemployer ? <ENavigation /> : <Navigation />}
      <div className="article" ref={zarticle}></div>
      <div className="author">
        <Avatar avatarsize={1} src={article?.User_id?.Picture} />
        <div>
          <p>{article?.User_id?.Name}</p>
          <p>{article?.User_id?.Job_title}</p>
        </div>
      </div>
    </div>
  );
}

export default FoundArticle;
