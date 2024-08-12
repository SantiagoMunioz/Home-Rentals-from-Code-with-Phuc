import React, { useContext, useEffect, useState } from "react";
import "../styles/Categories.css";
import LanguageContext from "../context/LanguageContext";
import { categorias, categories } from "../data";
import { Link } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";

const Categories = () => {
  const {texts, language} = useContext(LanguageContext);
  const {themeConfig} = useContext(ThemeContext);
  const [category, setCategory] = useState(categorias);
  
  useEffect(() => {
    if(language === "es"){ setCategory(categorias);}
    else{ setCategory(categories); }
  },[language]);

  return (
    <div className="categories-cont" style={{color: themeConfig.color}}>
      <h1 className="categories-title">{texts.cDTitle}</h1>
      <div className="categoriesText-cont">
        <p className="categories-text">
          {texts.cDPText1}
          <br/>
          {texts.cDPText2}
        </p>
      </div>
      <div className="categories-list">
        {category?.slice(1, 7).map((category, index) => (
          <Link className="categories-link" to={`/properties/category/${category.ref}`}>
            <div className="categorySel" key={index} style={{ color: "white" }}>
              <img className="category-img" src={category.img} alt={category.label} />
              <div className="category-overlay" />
              <div className="category-text">
                <img className="category-icon" src={category.icon} alt="X_X"/>
                <p className="category-label" key="catLabel">{category.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Categories