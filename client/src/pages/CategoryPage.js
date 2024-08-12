import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import "../styles/CategoryPage.css";
import { Loader } from "../components/Loader";
import { Navbar } from "../components/Navbar";
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";
import ListingCard from "../components/ListingCard";
import { categorias, categories } from "../data";
import Footer from "../components/Footer";

const CategoryPage = () => {
  const { language, texts } = useContext(LanguageContext);
  const { themeConfig } = useContext(ThemeContext);
  const { category } = useParams();
  const [categoryLang, setCategoryLang] = useState();
  const [loading, setLoading] = useState(true);
  const [categorySel, setCategorySel] = useState(categorias);
  const listings = useSelector((state) => state.listings);
  const dispatch = useDispatch();


  const getFeedListings = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/properties?category=${category}`,
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
    if(language === "es"){ setCategorySel(categorias); }
    else{ setCategorySel(categories); }
  },[language]);

  useEffect(() => {
    const selectedCategory = categorySel.find(cate => cate.ref === category);
    if (selectedCategory) {
      setCategoryLang(selectedCategory.label);
    } else {
      setCategoryLang(category);
    }
  }, [category, categorySel]);

  useEffect(() => {
    getFeedListings();
  }, [category]);

  return loading ? <Loader/> : (
    <>
      <Navbar/>
      <div
        className="categoryPage-cont"
        style={{
          color : themeConfig.color,
          background : themeConfig.backgroundElement
        }}
      >
        <h1 className="categoryPage-title">{texts.cPTitle} {categoryLang}</h1>
        <div className="categoryPage-list">
          {listings?.map((
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
              booking = false
            }) => (
              <ListingCard
                key={_id}
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
              />
            ))}
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default CategoryPage