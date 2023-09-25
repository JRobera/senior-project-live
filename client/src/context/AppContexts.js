import { createContext, useState } from "react";

export const AppContext = createContext();

const Context = ({ children }) => {
  const [accessToken, setaccessToken] = useState({});
  const [user, setUser] = useState({});
  const [employer, setEmployer] = useState({});
  const [signUpInfo, setSignUpInfo] = useState({});
  const [language, setLanguage] = useState("Amharic");
  const [content, setContent] = useState({});
  // const [showEditProf, setEditProf] = useState(false);
  const [room, setRoom] = useState("");
  const [messageList, setMessageList] = useState([]);

  return (
    <AppContext.Provider
      value={{
        accessToken,
        setaccessToken,
        user,
        setUser,
        employer,
        setEmployer,
        signUpInfo,
        setSignUpInfo,
        language,
        setLanguage,
        content,
        setContent,
        room,
        setRoom,
        messageList,
        setMessageList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default Context;
