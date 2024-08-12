import { useContext, useEffect, useState } from "react";
import "../styles/SignUpPage.css";
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";

export const SignUpPage = () => {
  const { texts } = useContext(LanguageContext);
  const { themeConfig, theme } = useContext(ThemeContext);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConf: "",
    profileImage: null,
  });

  const handleFormDataChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value,
    });
  }

  useEffect(() => {
    const password = formData.passwordConf;
    setPasswordMatch(formData.password === password || password === "")
  },[formData.passwordConf]);
  
  const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
      const register_form = new FormData()
      for(var key in formData){ register_form.append(key, formData[key]) }
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: register_form
      })
      if(response.ok){
        navigate("/log-in")
      }
    }catch(err){
      console.log("Registration failed", err.message)
    }
  }

  return (
    <div
      className="signUp-cont"
      style={{
        background: themeConfig.backgroundElement,
        color: themeConfig.color,
        border: themeConfig.border,
        borderRadius: themeConfig.borderRadius,
        backdropFilter: themeConfig.backdropFilter,
      }}
    >
      <Link
        className={`home-link ${theme === "light" ? "light" : "dark"}`}
        to="/"
        style={{
          color: themeConfig.color
        }}
      >
        ≪
      </Link>
      <form className="signUp-form" onSubmit={handleSubmit}>
        <input
          className={`signUp-input ${theme === "light" ? "light" : "dark"}`}
          name="firstName"
          value={formData.firstName}
          placeholder={texts.sUFirstName}
          required
          style={{
            borderColor: themeConfig.borderColor,
            color: themeConfig.color
          }}
          onChange={handleFormDataChange}
        />
        <input
          className={`signUp-input ${theme === "light" ? "light" : "dark"}`}
          name="lastName"
          value={formData.lastName}
          placeholder={texts.sULastName}
          required
          style={{
            borderColor: themeConfig.borderColor,
            color: themeConfig.color
          }}
          onChange={handleFormDataChange}
        />
        <input
          className={`signUp-input ${theme === "light" ? "light" : "dark"}`}
          name="email"
          type="email"
          value={formData.email}
          placeholder={texts.sUEmail}
          required
          style={{
            borderColor: themeConfig.borderColor,
            color: themeConfig.color
          }}
          onChange={handleFormDataChange}
        />
        <input
          className={`signUp-input pass ${theme === "light" ? "light" : "dark"}`}
          name="password"
          type="password"
          value={formData.password}
          placeholder={texts.sUPassword}
          required
          style={{
            borderColor: themeConfig.borderColor,
            color: themeConfig.color
          }}
          onChange={handleFormDataChange}
        />
        <input
          className={`signUp-input pass ${theme === "light" ? "light" : "dark"}`}
          name="passwordConf"
          type="password"
          value={formData.passwordConf}
          placeholder={texts.sUPasswordConf}
          required
          style={{
            borderColor: themeConfig.borderColor,
            color: themeConfig.color
          }}
          onChange={handleFormDataChange}
        />
        {!passwordMatch && ( <p className="passAdvice">{texts.sUPasswordErr}</p> )}
        <section className="signUp-sect">
          <input
            className={`signUp-img ${theme === "light" ? "light" : "dark"}`}
            name="profileImage"
            id="image"
            type="file"
            accept="image/*"
            required
            onChange={handleFormDataChange}
          />
          <label>{texts.sUProfileImage}</label>
          {formData.profileImage && (
            <img
              className="imgProfile"
              src={URL.createObjectURL(formData.profileImage)}
              alt={texts.sUProfileImageAlt}
            />
          )}
        </section>
        <button
          className={`signUp-button ${theme === "light" ? "light" : "dark"}`}
          type="submit"
          disabled={!passwordMatch}
          style={{
            color: themeConfig.color,
            background: themeConfig.backgroundButton,
          }}
        >
          {texts.sUButton}
        </button>
      </form>
      <Link className="login-link" to="/log-in" style={{ color: themeConfig.color }}>{texts.sULoginLinkText}</Link>
    </div>
  )
}