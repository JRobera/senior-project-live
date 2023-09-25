import React, { useContext } from "react";
import { AppContext } from "../context/AppContexts";
import "./Footer.css";
import LanguageSelector from "./LanguageTranslater/LanguageSelector";
import Logo from "./Logo";

import { CiSettings } from "react-icons/ci";
import { BsQuestionCircle } from "react-icons/bs";

function Footer() {
  const { content } = useContext(AppContext);

  return (
    <footer>
      <Logo logostyle="1" />
      <div className="bottom-nav">
        <p className="header">{}</p>
        <div className="bottom-nav-items">
          <div className="first-col">
            <p>{}</p>
            <p>{content.careers}</p>
            <p>{content.advertising}</p>
          </div>
          <div className="second-col">
            <p>{content.commuinityG}</p>
            <p>{content.privacyandterms}</p>
          </div>
        </div>
      </div>
      <div>
        <div className="fast-access">
          <p className="header">{content.fastaccess}</p>
          <span className="questions">
            <p>{content.questions}</p> <BsQuestionCircle size="1rem" />
          </span>
          <span className="settings">
            <p>{content.settings}</p> <CiSettings size="1rem" />
          </span>
        </div>
        <LanguageSelector />
      </div>
    </footer>
  );
}

export default Footer;
