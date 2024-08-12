import "../styles/ListingDetails.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DateRange } from "react-date-range";
import { facilities, instalaciones } from "../data";
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";
import { Loader } from "../components/Loader";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";

const ListingDetails = () => {
  const { texts, language } = useContext(LanguageContext);
  const { theme, themeConfig } = useContext(ThemeContext);
  const { listingId } = useParams();
  const navigate = useNavigate();
  const [ facility, setFacility ] = useState(instalaciones);
  const [ loading, setLoading ] = useState(true);
  const [ listing, setListing ] = useState(null);

  const [dateRange, setDateRange] = useState([
    {
      startDate : new Date(),
      endDate : new Date(),
      key : "selection"
    }
  ]);

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round(end-start) / (1000 * 60 * 60 * 24);

  const customerId = useSelector((state) => state?.user?._id);

  const getListingDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3001/properties/${listingId}`,
      {
        method : "GET",
      });
      const data = await response.json();
      setListing(data);
      setLoading(false);
    } catch (error) {
      console.log("Fetch Listing Details Failed", error.message);
    }
  }

  useEffect(() => {
    if(language === "es"){ setFacility(instalaciones); }
    else{ setFacility(facilities); }
  },[language]);

  useEffect(() => {
    getListingDetails();
  },[]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  }

  const handleSubmit = async () => {
    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId : listing.creator._id,
        startDate : dateRange[0].startDate.toDateString(),
        endDate : dateRange[0].endDate.toDateString(),
        totalPrice : listing.price * dayCount
      }
      const response = await fetch("http://localhost:3001/bookings/create",
        {
          method : "POST",
          headers : {
            "Content-Type" : "application/json",
          },
          body : JSON.stringify(bookingForm)
        }
      )
      if(response.ok){
        navigate(`/${customerId}/trips`)
      }
    } catch (err) {
      console.log("Submit Booking Failed.", err.message)
    }
  }

  return loading ? (
    <Loader/>
  ) : (
    <>
      <Navbar/>
      <div
        className="listingDetails-cont"
        style={{
          background : themeConfig.backgroundElement,
          color : themeConfig.color
        }}
      >
        <div
          className="listingDetailsTitle-cont"
          style={{ background : themeConfig.backgroundElement }}
        >
          <h1 className="listingDetails-title">{listing.title}</h1>
          <div
            className={`hearth
              ${theme === "light" ? "inverted":""}
            `}
          />
        </div>
        <div className="listingDetailsPhotos-cont">
          {listing.listingPhotoPaths?.map((item) => (
            <img
              className="listingDetails-img"
              src={`http://localhost:3001/${item.replace("public", "")}`}
              alt="pic"
            />
          ))}
        </div>
        <div className="listingInfo-guest g1"
          style={{ background : themeConfig.backgroundElement }}
        >
          <h2 className="listingInfo i1">{listing.type} {texts.lDConnect1} {listing.city}, {listing.province}, {listing.country}</h2>
          <p className="listingInfo i2">
            {listing.guestCount} {texts.cLStep1Text4a} - {listing.bedroomCount} {texts.cLStep1Text4b} - {listing.bedCount} {texts.cLStep1Text4c} - {listing.bathroomCount} {texts.cLStep1Text4d}
          </p>
        </div>
        <hr style={{ background : themeConfig.color }}/>
        <div
          className="listingProfile creator"
          style={{ background : themeConfig.backgroundElement }}
        >
          <img
            className="profileImg"
            src={
              `http://localhost:3001/${listing.creator.profileImagePath.replace(
                "public",
                ""
              )}`}
            alt="profile"
          />
          <h3 className="listingInfo i3">{texts.lDCreatorInfo1} {listing.creator.firstName} {listing.creator.lastName}</h3>
        </div>
        <hr style={{ background : themeConfig.color }}/>
        <div
          className="listingInfo-guest g2"
          style={{ background : themeConfig.backgroundElement }}
        >
          <h3 className="listingInfo i4">{texts.cLStep2Text4b}</h3>
          <p className="listingInfo i5">{listing.description}</p>
        </div>
        <hr style={{ background : themeConfig.color }}/>
        <div
          className="listingInfo-guest g3"
          style={{ background : themeConfig.backgroundElement }}
        >
          <h3 className="listingInfo i6">{listing.highlight}</h3>
          <p className="listingInfo i7">{listing.highlightDesc}</p>
        </div>
        <hr style={{ background : themeConfig.color }}/>
        <div
          className="listingInfo-booking"
          style={{ background : themeConfig.backgroundElement }}
        >
          <div className="listingInfo-bookingCont">
            <h2>{texts.lDPlaceInfo1}</h2>
            <div className="listingInfo-amenities">
              {listing.amenities[0].split(",").map((item, index) => (
                <div className="listingInfo-facility" key={index}>
                  {facility.find((facilityS) => facilityS.ref === item)?.icon}
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="listingInfo-calendar">
            <h2 className="listingInfo i8">{texts.lDPlaceTime1}</h2>
            <div className="listing-calendar">
              <DateRange ranges={dateRange} onChange={handleSelect} />
              <h2 className="listingInfo i9">${listing.price} x {dayCount} {texts.lDPlaceTime2}{dayCount > 1 ? "s":""}</h2>
              <h2 className="listingInfo i10">{texts.lDPlaceTime3}: ${listing.price * dayCount}</h2>
              <p className="listingInfo i11">{texts.lDPlaceTime4}: {dateRange[0].startDate.toDateString()}</p>
              <p className="listingInfo i12">{texts.lDPlaceTime5}: {dateRange[0].endDate.toDateString()}</p>
              <button
                className={`listingButton`}
                type="submit"
                onClick={handleSubmit}
                style={{
                  color : themeConfig.color,
                  background : themeConfig.backgroundButton
                }}
              >
                {texts.lDPlaceSubmit}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default ListingDetails