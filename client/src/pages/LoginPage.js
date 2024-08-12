import { useContext, useState } from "react";
import "../styles/LoginPage.css";
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";
import { setLogin } from "../redux/state";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export const LoginPage = () => {
  const { texts } = useContext(LanguageContext);
  const {themeConfig, theme} = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:3001/auth/login",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      const loggedIn = await response.json()

      if(loggedIn){
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token
          })
        )
        navigate("/")
      }
    } catch (error) {
      console.log("Login Failed", error.message);
    }
  }

  return (
    <div
      className="logIn-cont"
      style={{
        background: themeConfig.backgroundElement,
        color: themeConfig.color,
        border: themeConfig.border,
      }}
    >
      <Link className={`home-link ${theme === "light" ? "light" : "dark"}`} to="/" style={{ color: themeConfig.color }}>≪</Link>
      <form className="logIn-form" onSubmit={handleSubmit}>
        <input
          className="logIn-input"
          type="email"
          value={email}
          placeholder={texts.lIEmail}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="logIn-input pass"
          type="password"
          value={password}
          placeholder={texts.lIPassword}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className={`logIn-button ${theme === "light" ? "light" : "dark" }`}
          type="submit"
          style={{
            color: themeConfig.color,
            background: themeConfig.backgroundButton,
          }}
        >
          {texts.lIButton}
        </button>
      </form>
      <Link className="signUp-link" to="/sign-up" style={{color: themeConfig.color}}>{texts.lISignUpLinkText}</Link>
    </div>
  )
}