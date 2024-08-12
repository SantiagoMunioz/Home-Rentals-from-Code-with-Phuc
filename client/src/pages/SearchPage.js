import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import ListingCard from "../components/ListingCard";
import { Navbar } from "../components/Navbar";
import "../styles/SearchPage.css";
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";
import { Loader } from "../components/Loader";

const SearchPage = () => {
  const { texts } = useContext(LanguageContext);
  const { themeConfig } = useContext(ThemeContext);
  const listings = useSelector((state) => state.listings);
  const { search } = useParams();
  const dispatch = useDispatch();
  const [ loading, setLoading ] = useState(true);

  const getSearchListings = async () => {
    try {
      const response = await fetch(`http://localhost:3001/properties/search/${search}`,
        {
          method : "GET"
        }
      )
      const data = await response.json()
      dispatch( setListings({ listings : data }) )
      setLoading(false)
    } catch (err) {
      console.log("Fetch Search List failed", err.message)
    }
  }

  useEffect(() => {
    getSearchListings();
  });

  return loading ? <Loader/> : (
    <>
      <Navbar/>
      <div
        className="searchPage-cont"
        style={{
        color : themeConfig.color,
        background : themeConfig.backgroundElement
        }}
      >
        <h1 className="searchPage-title">{texts.sPTitle} {search}</h1>
        <div className="searchPage-list">
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
    </>
  )
}

export default SearchPage