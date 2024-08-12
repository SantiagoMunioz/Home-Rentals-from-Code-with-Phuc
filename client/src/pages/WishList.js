import "../styles/WishList.css";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { Navbar } from "../components/Navbar";
import ThemeContext from "../context/ThemeContext";
import LanguageContext from "../context/LanguageContext";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const WishList = () => {
  const { texts } = useContext(LanguageContext);
  const { themeConfig } = useContext(ThemeContext);
  const wishList = useSelector((state) => state.user.wishList);

  return (
    <>
      <Navbar/>
      <div
        className="wishList-cont"
        style={{
          color : themeConfig.color,
          background : themeConfig.backgroundElement
        }}
      >
        <h1 className="wishList-title">{texts.wLTitle}</h1>
        <div className="wishList-list">
          {wishList?.map((
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

export default WishList