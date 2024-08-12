import { useSelector } from "react-redux";
import "../styles/PropertyList.css";
import { Navbar } from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { useContext, useEffect, useState } from "react";
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";
import { Loader } from "../components/Loader";
import { useDispatch } from "react-redux";
import { setPropertyList } from "../redux/state";
import Footer from "../components/Footer";

const PropertyList = () => {
  const { texts } = useContext(LanguageContext);
  const { themeConfig } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user)
  const propertyList = user?.propertyList;
  const dispatch = useDispatch();

  const getPropertyList = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${user._id}/properties`, {
        method : "GET"
      })
      const data = await response.json();
      dispatch(setPropertyList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch all properties failed ", err.message);
    }
  }

  useEffect(() => {
    getPropertyList();
  },[]);
 
  return loading ? <Loader/> : (
    <>
      <Navbar/>
      <div
        className="propertyList-cont"
        style={{
          color : themeConfig.color,
          background : themeConfig.backgroundElement
        }}
      >
      <h1 className="propertyList-title">{texts.pLTitle}</h1>
      <div className="propertyList-list">
        {propertyList?.map((
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
      <Footer/>
    </>
  )
}

export default PropertyList