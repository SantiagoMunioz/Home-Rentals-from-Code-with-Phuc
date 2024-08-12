import React, { useContext, useEffect, useState } from "react";
import "../styles/Listings.css"
import { categorias, categories } from "../data";
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";
import ListingCard from "./ListingCard";
import { Loader } from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state";

const Listings = () => {
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings);
  const { language } = useContext(LanguageContext);
  const { themeConfig, theme } = useContext(ThemeContext);
  const [category, setCategory] = useState(categorias);
  const [loading ,setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "All" ?
          `http://localhost:3001/properties?category=${selectedCategory}`
        : "http://localhost:3001/properties",
        { method : "GET", },
      );

      const data = await response.json();
      dispatch(setListings({ listings : data }));
      setLoading(false);
    } catch (error) {
      console.log("Fetch Listing Failed", error.message);
    }
  };

  useEffect(() => {
    if(language === "es"){ setCategory(categorias); }
    else{ setCategory(categories); }
  },[language]);

  useEffect(() => {
    getFeedListings()
  }, [selectedCategory]);

  return (
    <div
      className="categoryList-cont"
      style={{
        color : themeConfig.color,
        background : themeConfig.backgroundElement
      }}
    >
      {category?.map((category, index) => (
        <div
          className={`categoryMap-cont ${category.ref === selectedCategory ? "selected":""}`}
          key={index}
          onClick={() => setSelectedCategory(category.ref)}
        >
          <img
            className={`categoryMap-icon ${theme === "dark" ? "":"inverted"}`}
            src={category.icon}
            alt=""
          />
          <p className="categoryMap-text">{category.label}</p>
        </div>
      ))}
      {loading ? <Loader/> : (
        <div
          className="listings-cont"
          style={{
            background: themeConfig.backgroundElement
          }}
        >
          {listings.map((
            {
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking=false
            }
          ) => (
            <ListingCard
              listingId = {_id}
              creator = {creator}
              listingPhotoPaths = {listingPhotoPaths}
              city = {city}
              province = {province}
              country = {country}
              category = {category}
              type = {type}
              price = {price}
              booking={booking}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Listings