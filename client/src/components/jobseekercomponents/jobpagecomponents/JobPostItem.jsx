import React from "react";
import Avatar from "../../Avatar";

function JobPostItem({
  handleClick,
  companyimage,
  id,
  jobtitle,
  companyname,
  joblocation,
}) {
  return (
    <div className="job__search--list" onClick={() => handleClick(id)}>
      <Avatar avatarsize="1" src={companyimage || "images/Job.png"} />
      <div className="job__search--title">
        <h4 className="job__post__title">{jobtitle} </h4>
        <h6 className="company__name">{companyname}</h6>
        <h6 className="job__location">{joblocation}</h6>
        {/* <p>3 days ago</p> */}
      </div>
    </div>
  );
}

export default JobPostItem;
