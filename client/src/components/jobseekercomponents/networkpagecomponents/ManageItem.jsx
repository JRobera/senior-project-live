import axios from "axios";
import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContexts";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { MdPersonAdd } from "react-icons/md";

function ManageItem({ handleSelectedTab, handleFs, handleGroup, user, icon }) {
  const { content } = useContext(AppContext);
  const [active, setActive] = useState(`${content.new}`);
  const tabs = [`${content.new}`, `${content.followingandfollowers}`];

  return (
    <>
      {tabs.map((tab, i) => {
        return (
          <div
            key={i}
            className={`mg-item ${active === tab ? "active-mg" : undefined}`}
            onClick={() => {
              if (tab === `${content.new}`) {
                setActive(tab);
                handleSelectedTab(tab);
              } else if (tab === `${content.followingandfollowers}`) {
                setActive(tab);
                handleSelectedTab(tab);
                axios
                  .get(
                    `https://senior-project-live-api.onrender.com/ff/${user.u_id}`
                  )
                  .then((response) => {
                    console.log(response.data);
                    let followingandfollowers = response.data.Following.concat(
                      response.data.Follower
                    ).reduce((acc, cur) => {
                      const found = acc.find((obj) => {
                        return obj._id === cur._id;
                      });
                      if (!found) {
                        acc.push(cur);
                      }
                      return acc;
                    }, []);
                    handleFs(followingandfollowers);
                  });
              }
            }}
          >
            {i === 0 ? (
              <MdPersonAdd size="1.2rem" />
            ) : (
              <PeopleAltOutlinedIcon size="1.2rem" />
            )}
            <p>{tab}</p>
          </div>
        );
      })}
    </>
  );
}

export default ManageItem;
