import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./context/AppContexts";
import { generateError } from "./utility/Toasts";

async function Auth() {
  try {
    const response = await axios.post(
      "http://localhost:3005/api/arefresh",
      {},
      {
        withCredentials: true,
      }
    );
    const isAuthenticated = response.data.accessToken ? true : false;
    return isAuthenticated;
  } catch (error) {
    console.log(error);
    return false;
  }
}

function AdminProtectedRoutes() {
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
          `http://localhost:3005/api/arefresh`,
          {},
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          setUser(jwt_decode(response.data?.accessToken));
          setaccessToken(response.data?.accessToken);
        });
    } catch (err) {
      generateError(err);
    }

    fetchData();
  }, []);

  if (isAuth === null) {
    return <div>Loading...</div>; // Replace with your preferred loading indicator
  }

  return isAuth ? <Outlet /> : <Navigate to="/admin/login" replace />;
}

export default AdminProtectedRoutes;
