import React, { useContext, useState } from "react";
import "../styles/Navbar.css";
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";
import PersonIcon from "../assets/icons/Person-ico.png";
import HomeIcon from "../assets/icons/Home-ico.png";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/state";
import { WindowResize } from "../functions/WindowResize";

export const Navbar = () => {
  const { texts, handleLanguageChange } = useContext(LanguageContext);
  const { theme, handleThemeChange } = useContext(ThemeContext);
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const wResize = WindowResize();

  return (
    <div className={`navbar-cont ${wResize < 750 ? "resized" : ""}`}>
      <label className="navbar-resized-label">≡</label>
      <div className="navbar-content">
        <Link
          className="home-link"
          to="/"
        >
          <img
            className="homeImage"
            src={HomeIcon}
            alt="logo"
          />
        </Link>
        <div className="navbar-search">
          <input
            className="searchInput"
            type="text"
            placeholder={texts.nSearch}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            disabled={search === ""}
            className="searchButton"
            onClick={() => {navigate(`/properties/search/${search}`)}}
          >
          </button>
        </div>
        <button
          className="themeSel"
          onClick={handleThemeChange}
        >
          {theme === "dark" ? `${texts.nThemeDark}` : `${texts.nThemeLight}`}
        </button>
        <section className="langSel-sect">
          <label className="langSel-text">🌐</label>
          <select className="langSel" onClick={handleLanguageChange}>
            <option value="es">ES</option>
            <option value="en">EN</option>
          </select>
        </section>
        <div className="navbar-right">
          {user ? (
            <Link className="nLink" to="/create-listing">{texts.nBecomeHost}</Link>
          ) : (
            <Link className="nLink" to="/log-in">{texts.nBecomeHost}</Link>
          )}
          <button className="navbar-right-account" onClick={() => setDropdownMenu(!dropdownMenu)}>
            ≡
            {!user ?
              <img className="profileImage" src={PersonIcon} alt="profile" />
              :
              <img
                className="profileImage"
                src={`http://localhost:3001/${user.profileImagePath.replace("public", "")}`}
                alt="profile"
                style={{ filter: "none"}}
              />
            }
          </button>
          {dropdownMenu && !user && (
            <div className="navbar-right-accountmenu">
              <Link to="/log-in">{texts.lIButton}</Link>
              <Link to="/sign-up">{texts.sUButton}</Link>
            </div>
          )}
          {dropdownMenu && user && (
            <div className="navbar-right-accountmenu">
              <Link to={`/${user._id}/trips`}>{texts.nTripList}</Link>
              <Link to={`/${user._id}/wish-list`}>{texts.nWishList}</Link>
              <Link to={`/${user._id}/properties`}>{texts.nPropertyList}</Link>
              <Link to={`/${user._id}/reservations`}>{texts.nReservationList}</Link>
              <Link to="/create-listing">{texts.nBecomeHost}</Link>
              <Link to="/log-in" onClick={() => {dispatch(setLogout())}}>{texts.nLogOut}</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}