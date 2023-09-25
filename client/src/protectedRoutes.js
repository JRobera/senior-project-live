import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./context/AppContexts";
import { RefreshToken } from "./api/refreshToken";
import { generateError } from "./utility/Toasts";

async function Auth() {
  try {
    const response = await axios.post(
      "https://senior-project-live-api.onrender.com/api/refresh",
      {},
      {
        withCredentials: true,
      }
    );
    const isAuthenticated = response.data.accessToken ? true : false;
    // console.log(isAuthenticated);
    return isAuthenticated;
  } catch (error) {
    console.log(error);
    return false;
  }
}

function ProtectedRoutes() {
  const [isAuth, setIsAuth] = useState(null);
  const { setUser, setaccessToken } = useContext(AppContext);

  useEffect(() => {
    async function fetchData() {
      const result = await Auth();
      setIsAuth(result);
    }
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

    fetchData();
  }, []);

  if (isAuth === null) {
    return <div>Loading...</div>; // Replace with your preferred loading indicator
  }
  // console.log(isAuth);

  return isAuth ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoutes;
