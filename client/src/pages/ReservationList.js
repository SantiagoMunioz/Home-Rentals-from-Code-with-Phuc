import "../styles/ReservationList.css";
import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "../components/Loader";
import { Navbar } from "../components/Navbar";
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";
import { setReservationList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const ReservationList = () => {
  const { texts } = useContext(LanguageContext);
  const { themeConfig } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const userId = useSelector((state) => state.user._id);
  const reservationList = useSelector((state) => state.user.reservationList);

  const getReservationList = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}/reservations`,
        {
          method : "GET"
        }
      );
      const data = await response.json();
      dispatch(setReservationList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch reservation List failed", err.message);
    }
  }

  useEffect(() => {
    getReservationList();
  },[]);

  return loading ? <Loader/> : (
    <>
      <Navbar/>
      <div
        className="reservations-cont"
        style={{
          background : themeConfig.backgroundElement,
          color : themeConfig.color
        }}
      >
        <h1 className="reservations-title">{texts.rLTitle}</h1>
        <div className="reservations-list">
          {reservationList?.map(({listingId, hostId, startDate, endDate, totalPrice, booking=true}) => (
            <ListingCard
              listingId={listingId._id}
              creator={hostId._id}
              startDate={startDate}
              endDate={endDate}
              totalPrice={totalPrice}
              listingPhotoPaths={listingId.listingPhotoPaths}
              city={listingId.city}
              province={listingId.province}
              country={listingId.country}
              category={listingId.category}
              booking={booking}
            />
          ))}
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default ReservationList