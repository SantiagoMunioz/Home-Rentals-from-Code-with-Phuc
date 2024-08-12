import React, { useContext } from 'react'
import LanguageContext from '../context/LanguageContext'
import ThemeContext from '../context/ThemeContext';

const Slide = () => {
  const { texts } = useContext(LanguageContext);
  const { themeConfig } = useContext(ThemeContext);

  return (
    <div className="slide-cont" style={{color: themeConfig.color, padding: "2%", textAlign: "center"}}>
      <h1>{texts.slWelcome1}<br/>{texts.slWelcome2}</h1>
    </div>
  )
}

export default Slide