import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/TripList.css";
import { Loader } from "../components/Loader";
import { Navbar } from "../components/Navbar";
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";
import { setTripList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const TripList = () => {
  const { texts } = useContext(LanguageContext);
  const { themeConfig } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const userId = useSelector((state) => state.user._id);
  const tripList = useSelector((state) => state.user.tripList);

  const getTripList = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}/trips`,{
        method : "GET"
      });
      const data = await response.json();
      dispatch(setTripList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Trip List failed", err.message);
    }
  }

  useEffect(() => {
    getTripList();
  },[]);

  return loading ? <Loader/> : (
    <>
      <Navbar/>
      <div
        className="trips-cont"
        style={{
          background : themeConfig.backgroundElement,
          color : themeConfig.color
        }}
      >
        <h1 className="trips-title">{texts.tLTitle}</h1>
        <div className="trips-list">
          {tripList?.map(({ listingId, hostId, startDate, endDate, totalPrice, booking=true }) => (
            <ListingCard
              listingId={listingId._id}
              // creator={hostId._id}
              listingPhotoPaths={listingId.listingPhotoPaths}
              city={listingId.city}
              province={listingId.province}
              country={listingId.country}
              category={listingId.category}
              startDate={startDate}
              endDate={endDate}
              totalPrice={totalPrice}
              booking={booking}
            />
          ))}
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default TripList