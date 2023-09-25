import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Post from "./components/jobseekercomponents/feedpagecomponents/feed/Post";
import axios from "axios";
import Avatar from "./components/Avatar";
import Navigation from "./components/Navigation";
import ENavigation from "./components/employerpagecomponents/ENavigation";
import { AppContext } from "./context/AppContexts";

function FoundPost() {
  const [post, setPost] = useState();
  const { user } = useContext(AppContext);
  const params = useParams();
  // console.log(params);

  useEffect(() => {
    axios
      .get(
        `https://senior-project-live-api.onrender.com/found/post/${params.id}`
      )
      .then((response) => {
        if (response) {
          setPost(response.data);
        }
      });
  }, [params?.id]);

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);
  return (
    <>
      {user?.u_isemployer ? <ENavigation /> : <Navigation />}

      <div className="post found__post">
        <div className="post__header">
          <Link className="user__info" to={"/profile/" + post?.User_id?._id}>
            <Avatar avatarsize="1" src={post?.User_id?.Picture} />
            <div className="post__info">
              <h4>{post?.User_id?.Name}</h4>
              <p>{post?.User_id?.Job_title}</p>
            </div>
          </Link>
        </div>
        <div className="post__body">
          <img src={post?.postUrl} alt="" />
          <p>{post?.Post_description}</p>
        </div>
      </div>
    </>
  );
}

export default FoundPost;
