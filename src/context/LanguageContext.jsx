import { createContext, useContext, useState, useEffect } from "react";
import { getTranslation } from "../json/translation/translation";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem("app_lang") || "en");

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem("app_lang", newLang);
  };

  const t = (path) => getTranslation(lang, path);

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);