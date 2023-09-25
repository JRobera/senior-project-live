import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./article.css";
import axios from "axios";
import { AppContext } from "../../../../context/AppContexts";
// import jwt_decode from "jwt-decode";
import { ToastContainer } from "react-toastify";
import { generateError, generatesuccess } from "../../../../utility/Toasts";
import "react-toastify/dist/ReactToastify.css";

function Article() {
  const editorRef = React.useRef();
  const { user, accessToken } = useContext(AppContext);
  const [headline, setHeadline] = useState();
  const [article, setArticle] = useState();

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ script: "sub" }, { script: "super" }],
      ["code-block"],
      ["link", "image", "video"],
      ["clean"],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "align",
    "code-block",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const handleProcedureContentChange = (content, delta, source, editor) => {
    setArticle(content);
  };

  const handleHeadline = (e) => {
    const { value } = e.target;
    setHeadline(value);
  };

  let history = useNavigate();

  const redirect = () => {
    history("/emp/feed");
  };

  // const refreshToken = () => {
  //   try {
  //     axios
  //       .post(
  //         `https://senior-project-live-api.onrender.com/api/refresh`,
  //         {},
  //         {
  //           withCredentials: true,
  //         }
  //       )
  //       .then((response) => {
  //         setUser(jwt_decode(response.data?.accessToken));
  //         setaccessToken(response.data?.accessToken);
  //         // console.log(Object.keys(user).length);
  //       });
  //   } catch (err) {
  //     generateError(err);
  //   }
  // };
  // useEffect(() => {
  //   refreshToken();
  // }, []);

  return (
    <div className="compose">
      <textarea
        name=""
        id="article-headline"
        placeholder="Headline"
        value={headline}
        onChange={handleHeadline}
      ></textarea>
      {/* {console.log(article)} */}
      <ReactQuill
        placeholder="Content goes here..."
        value={article}
        theme="snow"
        ref={editorRef}
        modules={modules}
        formats={formats}
        onChange={handleProcedureContentChange}
      />

      <button
        className="btn-publish"
        onClick={async () => {
          if (article !== "<p><br></p>" && article !== undefined) {
            // console.log(article);
            // refreshToken();
            axios
              .post(
                `https://senior-project-live-api.onrender.com/new/article`,
                {
                  articleTitle: headline,
                  newArticle: article,
                  id: user.u_id,
                },
                {
                  headers: {
                    Authorization: "Bearer " + accessToken,
                  },
                }
              )
              .then((response) => {
                // console.log(response);
                generatesuccess(response.data);
                redirect();
              })
              .catch((err) => {
                generateError(err);
              });
          } else {
            // console.log("Can not create empty article");
            generateError("Can not create empty article");
          }
        }}
      >
        Publish
      </button>
      <ToastContainer />
    </div>
  );
}

export default Article;
