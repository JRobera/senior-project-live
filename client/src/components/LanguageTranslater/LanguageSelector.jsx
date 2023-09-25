import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContexts";
import "./LanguageSelector.css";
import Translation from "./Translations.json";

function LanguageSelector() {
  const { language, setLanguage, content, setContent } = useContext(AppContext);
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
  }, []);
  return (
    <div className="language">
      <p className="header">{content.language}</p>
      <select
        name="languages"
        id=""
        value={language}
        onChange={(e) => {
          const { value } = e.target;
          setLanguage(value);
          localStorage.setItem("lang", value);
        }}
      >
        <option value="Amharic">Amharic</option>
        <option value="English">English</option>
        <option value="Afaan_Oromoo">Afaan_Oromoo</option>
      </select>
    </div>
  );
}

export default LanguageSelector;
