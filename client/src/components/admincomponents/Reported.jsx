import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Reported.css";
import { generatesuccess } from "../../utility/Toasts";

function Reported() {
  const [reportes, setReportes] = useState(null);

  function handleRefreshOnDelete() {
    axios.get("http://localhost:3005/get-reports").then((response) => {
      setReportes(response.data);
      console.log(response.data);
    });
  }

  useEffect(() => {
    handleRefreshOnDelete();
  }, []);

  return (
    <div className="reported-wrapper">
      <h1>Reported</h1>
      <div className="report-header">
        <span>Post</span>
        <span>Report count</span>
        <span>Action</span>
      </div>
      {reportes?.map((report, i) => {
        return (
          <div className="report-detail" key={i}>
            <span>{report?.postId?.Post_description}</span>
            <span>{report?.reportCount}</span>
            <span>
              <button
                onClick={() => {
                  axios
                    .delete(
                      `http://localhost:3005/delete-reported/${report?._id}/${report?.postId?._id}`
                    )
                    .then((response) => {
                      handleRefreshOnDelete();
                      generatesuccess(response.data);
                    });
                }}
              >
                Delete
              </button>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default Reported;
