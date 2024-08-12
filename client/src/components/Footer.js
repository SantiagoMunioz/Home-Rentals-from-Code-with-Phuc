import { Link } from "react-router-dom";
import "../styles/Footer.css";
import { useContext } from "react";
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";
import Logo from "../assets/icons/Logo-ico.png";
import Phone from "../assets/icons/Phone-ico.png";
import Email from "../assets/icons/Email-ico.png";

const Footer = () => {
  const { texts } = useContext(LanguageContext);
  const { theme, themeConfig } = useContext(ThemeContext);

  return (
    <div
      className="footer-cont"
      style={{
        background : themeConfig.backgroundElement,
        color : themeConfig.color
      }}
    >
      <div className="footer left">
        <Link style={{ color : themeConfig.color }} className="link logo" to="/">
          <img className="imgLogo" src={Logo} alt="logo"/>
        </Link>
      </div>
      <div className="footer center">
        <h3 className="footer-titleCenter">{texts.fCTitle}</h3>
        <ul className="links-cont">
          <Link style={{ color : themeConfig.color }} className="link cl1">{texts.fCLink1}</Link>
          <Link style={{ color : themeConfig.color }} className="link cl2">{texts.fCLink2}</Link>
          <Link style={{ color : themeConfig.color }} className="link cl3">{texts.fCLink3}</Link>
        </ul>
      </div>
      <div className="footer right">
        <h3 className="footer-titleRight">{texts.fRTitle}</h3>
        <div className="footer-rightInfo">
          <p>
            <img
              className={`iconImg phone ${theme === "light" ? "inverted":""}`}
              src={Phone}
              alt="phone"
            />
            +1 234 567 890
          </p>
          <p>
            <img
              className={`
                iconImg email
                ${theme === "light" ? "inverted":""}
              `}
              src={Email}
              alt="email"
            />
            dreamnest@support.com
          </p>
          <img src="" alt="payment"/>
        </div>
      </div>
    </div>
  )
}

export default Footer