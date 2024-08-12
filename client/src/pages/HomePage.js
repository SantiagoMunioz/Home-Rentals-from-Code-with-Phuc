import "../styles/HomePage.css";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import Categories from "../components/Categories";
import { Navbar } from "../components/Navbar";
import Slide from "../components/Slide";
import Listings from "../components/Listings";
import Footer from "../components/Footer";

export const HomePage = () => {
  const { themeConfig } = useContext(ThemeContext);

  return (
    <div className="home-cont" style={{ textShadow: themeConfig.textShadow }}>
      <Navbar/>
      <Slide/>
      <Categories/>
      <Listings/>
      <Footer/>
    </div>
  );
}