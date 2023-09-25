import "./App.css";
import Footer from "./components/Footer";

import { Navigate, Route, Routes } from "react-router-dom";
import ChatContainer from "./components/jobseekercomponents/chatpagecomponents/ChatContainer";
import FeedContainer from "./components/jobseekercomponents/feedpagecomponents/FeedContainer";
import HomeContainer from "./components/jobseekercomponents/homepagecomponents/HomeContainer";
import JobContainer from "./components/jobseekercomponents/jobpagecomponents/JobContainer";
import NetworkContainer from "./components/jobseekercomponents/networkpagecomponents/NetworkContainer";
import ProfileContainer from "./components/jobseekercomponents/profilepagecomponents/ProfileContainer";
import NotificationContainer from "./components/jobseekercomponents/notificatinpagecomponents/NotificationContainer";
import SignIn from "./components/jobseekercomponents/homepagecomponents/SignIn";
import ForgotPassword from "./components/ForgotPassword";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContexts";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { rejects } from "assert";
import Article from "./components/jobseekercomponents/feedpagecomponents/article/Article";
import EArticle from "./components/employerpagecomponents/feedpagecomponents/article/Article";

import ProtectedRoutes from "./protectedRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageNotFound from "./PageNotFound";
import FoundCompany from "./FoundCompany";
import FoundPost from "./FoundPost";
import FoundArticle from "./FoundArticle";
import FoundUser from "./FoundUser";
import { log } from "util";
import Translation from "./components/LanguageTranslater/Translations.json";
import EmployerHomeContainer from "./components/employerpagecomponents/homepagecomponents/EmployerHomeContainer";
import EmployerSignIn from "./components/employerpagecomponents/homepagecomponents/EmployerSignIn";
import EmployerFeedContainer from "./components/employerpagecomponents/feedpagecomponents/EmployerFeedContainer";
import EmployerNetworkContainer from "./components/employerpagecomponents/networkpagecomponents/EmployerNetworkContainer";
import EmployerJobContainer from "./components/employerpagecomponents/jobpagecomponents/EmployerJobContainer";
import EmployerChatContainer from "./components/employerpagecomponents/chatpagecomponents/EmployerChatContainer";
import EmployerNotificationContainer from "./components/employerpagecomponents/notificationpagecomponents/EmployerNotificationContainer";
import EmployerProfileContainer from "./components/employerpagecomponents/profilepagecomponents/EmployerProfileContainer";
import EmployerProtectedRoutes from "./employerProtectedRoutes";
import CommonProtectedRoutes from "./commonProtectedRoutes";
import JobApplicants from "./components/employerpagecomponents/profilepagecomponents/JobApplicants";
import FoundJobPost from "./FoundJobPost";
import ResetPassword from "./components/ResetPassword";
import AdminContainer from "./components/admincomponents/AdminContainer";
import AdminLogin from "./components/admincomponents/AdminLogin";
import AdminProtectedRoutes from "./adminProtectedRoutes";

function App() {
  const {
    user,
    setUser,
    employer,
    setEmployer,
    accessToken,
    setaccessToken,
    language,
    setLanguage,
    setContent,
  } = useContext(AppContext);

  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

  const refreshToken = () => {
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
        });
    } catch (err) {
      generateError(err);
    }
  };

  const erefreshToken = () => {
    try {
      axios
        .post(
          `https://senior-project-live-api.onrender.com/api/erefresh`,
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
  };

  useEffect(() => {
    const lang = localStorage.getItem("lang");
    if (lang) {
      setLanguage(lang);
      if (language === "Afaan_Oromoo") {
        setContent(Translation.Afaan_Oromoo);
      } else if (language === "Amharic") {
        setContent(Translation.Amharic);
      } else if (language === "English") {
        setContent(Translation.English);
      }
    }
  }, [language]);

  useEffect(() => {
    const lang = localStorage.getItem("lang");
    if (!lang) {
      setLanguage("Amharic");
      setContent(Translation.Amharic);
    }

    refreshToken();
    setInterval(() => {
      refreshToken();
    }, 870000);

    erefreshToken();
    setInterval(() => {
      erefreshToken();
    }, 870000);
  }, []);

  // const axiosJWT = axios.create();

  // axios.interceptors.request.use(
  //   async (config) => {
  //     let currentDate = new Date();
  //     if (user.exp * 1000 < currentDate.getTime()) {
  //       refreshToken();
  //       config.headers["authorization"] = "Bearer " + accessToken;
  //     }
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

  return (
    <div className="App">
      <Routes>
        <Route element={<AdminProtectedRoutes />}>
          <Route path="/dashboard" element={<AdminContainer />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/" element={<HomeContainer />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/feed" element={<FeedContainer />} exact />
          <Route path="/network" element={<NetworkContainer />} />
          <Route path="/jobs" element={<JobContainer />} />
          <Route path="/chat" element={<ChatContainer />} />
          <Route path="/notification" element={<NotificationContainer />} />
          <Route path="/profile" element={<ProfileContainer />} />
          <Route path="/new/article" element={<Article />} />
        </Route>

        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* new password */}

        <Route path="/reset-password/:token/:id" element={<ResetPassword />} />

        <Route element={<CommonProtectedRoutes />}>
          {/* show found post */}
          <Route path="/post/:id" element={<FoundPost />} />

          {/* show found article */}
          <Route path="/article/:id" element={<FoundArticle />} />

          {/* show other user profile */}
          <Route path="/profile/:id" element={<FoundUser />} />

          {/* show company profile */}
          <Route path="/company/:id" element={<FoundCompany />} />

          <Route path="/job-post/:id" element={<FoundJobPost />} />
        </Route>

        {/* Employer */}
        <Route path="/emp/home" element={<EmployerHomeContainer />} />
        <Route element={<EmployerProtectedRoutes />}>
          <Route path="/emp/feed" element={<EmployerFeedContainer />} exact />
          <Route path="/emp/network" element={<EmployerNetworkContainer />} />
          <Route path="/emp/jobs" element={<EmployerJobContainer />} />
          <Route path="/emp/chat" element={<EmployerChatContainer />} />
          <Route
            path="/emp/notification"
            element={<EmployerNotificationContainer />}
          />
          <Route path="/emp/profile" element={<EmployerProfileContainer />} />
          <Route path="/new/emp/article" element={<EArticle />} />
          <Route path="/job-applicants/:id" element={<JobApplicants />} />
        </Route>

        <Route path="/emp/signin" element={<EmployerSignIn />} />

        {/* 404 route */}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
