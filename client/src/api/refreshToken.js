import { toast } from "react-toastify";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useContext } from "react";
import { AppContext } from "../context/AppContexts";

const generateError = (error) =>
  toast.error(error, {
    position: "bottom-right",
  });

const RefreshToken = () => {
  const { setUser, setaccessToken } = useContext(AppContext);
  try {
    axios
      .post(
        `https://senior-project-live-api.onrender.com/api/refresh`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setUser(jwt_decode(response.data?.accessToken));
        setaccessToken(response.data?.accessToken);
        // console.log(Object.keys(user).length);
      });
  } catch (err) {
    generateError(err);
  }
};

export { RefreshToken };
