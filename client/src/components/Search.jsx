import React, { useContext, useEffect, useState } from "react";
import "./Search.css";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { AppContext } from "../context/AppContexts";
import axios from "axios";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import DropDown from "./DropDown";

function Search() {
  const { user, content } = useContext(AppContext);
  const [filter, setFilter] = useState("Post");
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  function search() {
    if (query && filter) {
      axios
        .get(
          `https://senior-project-live-api.onrender.com/search/${filter}/${query}/${user.u_id}`
        )
        .then((response) => {
          setSearchResult(response.data);
          // console.log(response.data);
        });
    } else {
      setSearchResult("");
    }
  }
  useEffect(() => {
    search();
  }, [query]);

  function handlefilter(filter) {
    setFilter(filter);
  }
  return (
    <div className="search-wrapper">
      <form className="search">
        {/* <SearchOutlinedIcon /> */}
        <DropDown handlefilter={handlefilter} />
        {/* <select
          className="search-filter"
          name="filter"
          value={filter}
          onChange={(e) => {
            const { value } = e.target;
            setFilter(value);
          }}
        >
          <option value="Post">Post</option>
          <option value="Article">Article</option>
          <option value="Jobseeker">Jobseeker</option>
          <option value="Employer">Employer</option>
        </select> */}
        <input
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const { value } = e.target;
              setQuery(value);
              console.log(value + " " + filter);
              search();
            }
          }}
          className="search-field"
          type="search"
          placeholder={content.search}
        />
      </form>
      <div className="search-result">
        {searchResult &&
          searchResult?.map((result) => {
            // console.log(result);
            if (filter === `${content.post}`) {
              return (
                <Link to={"/post/" + result?._id} key={result?._id}>
                  <div className="post-result">
                    <Avatar
                      avatarsize="1"
                      src={result?.User_id?.Picture}
                      alt="post"
                    />
                    <span>{result?.Post_description}</span>
                    {/* <span>{result.Job_title}</span> */}
                  </div>
                </Link>
              );
            } else if (filter === `${content.article}`) {
              return (
                <Link to={"/article/" + result._id} key={result._id}>
                  <div className="article-result">
                    <Avatar avatarsize="1" src={result?.User_id?.Picture} />
                    <div>
                      <span>{result.Article_title}</span>
                      <span>{result.User_id.Name}</span>
                    </div>
                  </div>
                </Link>
              );
            } else if (filter === `${content.jobseeker}`) {
              return (
                <Link to={"/profile/" + result._id} key={result._id}>
                  <div className="jobseeker-result">
                    <Avatar avatarsize="1" src={result?.Picture} />
                    <div>
                      <span>{result.Name}</span>
                      <span>{result.Job_title}</span>
                    </div>
                  </div>
                </Link>
              );
            } else if (filter === `${content.employer}`) {
              return (
                <Link to={"/company/" + result._id} key={result._id}>
                  <div className="company-result">
                    <Avatar avatarsize="1" src={result?.Picture} />
                    <div>
                      <span>{result.Name}</span>
                      <span>{result.Job_type}</span>
                    </div>
                  </div>
                </Link>
              );
            } else if (filter === `${content.jobpost}`) {
              return (
                <Link to={"/job-post/" + result._id} key={result._id}>
                  <div className="job-result">
                    <Avatar avatarsize="0" src={result?.Company_id?.Picture} />
                    <div>
                      <span>{result?.Job_title}</span>
                      <span>{result.Company_name}</span>
                    </div>
                  </div>
                </Link>
              );
            }
          })}
      </div>
    </div>
  );
}

export default Search;
