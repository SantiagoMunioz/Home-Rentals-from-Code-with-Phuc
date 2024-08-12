import { createContext, useState } from "react";
import ThemeDataBase from "../data-bases/themeContextDataBase.json";

const ThemeContext = createContext();

const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState("dark");
  const [themeConfig, setThemeConfig] = useState(ThemeDataBase[theme]);

  const handleThemeChange = _ => {
    if(theme === "light"){
      setTheme("dark");
      setThemeConfig(ThemeDataBase.dark);
    }else{
      setTheme("light");
      setThemeConfig(ThemeDataBase.light);
    }
  }

  const data = {theme, themeConfig, handleThemeChange}

  return (
    <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>
  )
}

export {ThemeProvider};
export default ThemeContext;