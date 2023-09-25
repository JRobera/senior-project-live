import React, { useContext, useEffect, useState } from "react";
import "./EmployerNetworkContainer.css";
import ENavigation from "../ENavigation";
import ManageItem from "./ManageItem";
import FollowCard from "./FollowCard";
import { AppContext } from "../../../context/AppContexts";
import axios from "axios";
import { generateError } from "../../../utility/Toasts";
import Avatar from "../../Avatar";

function EmployerNetworkContainer() {
  const { content, user } = useContext(AppContext);
  const [upUser, setUpUser] = useState();
  const [networkUsers, setNetworkUsers] = useState();
  const [selectedTab, setSelectedTab] = useState(`${content.new}`);
  const [data, setData] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  function handleSelectedTab(tab) {
    setSelectedTab(tab);
  }

  function handleFs(data) {
    setData(data);
  }

  function handleUnfollowedUsers() {
    axios
      .get(`http://localhost:3005/get/new/network/${user?.u_id}`)
      .then((response) => {
        // console.log(response.data);
        setNetworkUsers(response.data);
      })
      .catch((err) => {
        generateError(err);
      });
  }

  useEffect(() => {
    setUpUser(user);
  }, [user]);

  useEffect(() => {
    handleUnfollowedUsers();
  }, []);

  return (
    <>
      <ENavigation />
      <div className="network-wrapper">
        <div className="manage-my-network-wrapper">
          <div className="mg-header">{content.managemynetwork}</div>
          <div className="manage">
            <ManageItem
              handleSelectedTab={handleSelectedTab}
              handleFs={handleFs}
              user={upUser}
            />
            {isExpanded ? <p>group info</p> : null}
          </div>
        </div>
        <div className="recommendation">
          {selectedTab === `${content.new}`
            ? networkUsers?.map((nuser) => {
                return (
                  <FollowCard
                    key={nuser._id}
                    newFollow={nuser._id}
                    currentUser={user.u_id}
                    pic={nuser.Picture}
                    name={nuser.Name}
                    title={nuser.Job_title}
                    about={nuser.About}
                    handleUnfollowedUsers={handleUnfollowedUsers}
                  />
                );
              })
            : selectedTab === `${content.followingandfollowers}`
            ? data?.map((ff) => {
                return (
                  <div key={ff._id} className="card-wrapper">
                    <div className="card-detail">
                      <Avatar avatarsize={1} src={ff.Picture} />
                      <div className="card-user-detail">
                        <p>{ff.Name}</p>
                        <p>{ff.Job_title}</p>
                      </div>
                    </div>
                    <div className="card-summery">{ff.About}</div>
                  </div>
                );
              })
            : selectedTab === "Groups"
            ? setIsExpanded(false)
            : null}
        </div>
      </div>
    </>
  );
}

export default EmployerNetworkContainer;
