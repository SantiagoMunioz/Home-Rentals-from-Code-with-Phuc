import { createContext, useState } from "react";
import LangDataBase from "../data-bases/LanguageContextDataBase.json";

const LanguageContext = createContext();

const LanguageProvider = ({children}) => {
  const [language, setLanguage] = useState("es");
  const [texts, setTexts] = useState(LangDataBase[language]);

  const handleLanguageChange = (e) => {
    if(e.target.value === "es"){
      setLanguage("es");
      setTexts(LangDataBase.es);
    }else{
      setLanguage("en");
      setTexts(LangDataBase.en);
    }
  }

  const data = {language, texts, handleLanguageChange}

  return (
    <LanguageContext.Provider value={data}>{children}</LanguageContext.Provider>
  )
}

export { LanguageProvider }
export default LanguageContext;