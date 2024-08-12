import "../styles/ListingCard.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ThemeContext from "../context/ThemeContext";
import LanguageContext from "../context/LanguageContext";
import { setWishList } from "../redux/state";

const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths,
  city,
  province,
  country,
  category,
  type,
  price,
  startDate,
  endDate,
  totalPrice,
  booking
}) => {
  const { texts } = useContext(LanguageContext);
  const { theme, themeConfig } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const user = useSelector((state) => state.user);
  const wishList = useSelector((state) => user?.wishList) || [];
  const isLiked = wishList?.find((item) => item?._id === listingId);

  const patchWishList = async () => {
    if(user?._id !== creator._id){
      const response = await fetch (`http://localhost:3001/users/${user?._id}/${listingId}`,
        {
          method : "PATCH",
          header : {
            "Content-Type" : "application/json",
          },
        }
      );
      const data = await response.json();
      dispatch(setWishList(data.wishList))
    }else{ return; }
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length);
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  return (
    <div className="listingCard-cont"
      style={{background: themeConfig.backgroundElement}}
      onClick={() => {
        navigate(`/properties/${listingId}`);
      }}
    >
      <div className="listingCardSlider-cont">
        <div className="slider" style={{transform: `translateX(-${currentIndex * 100}%)`}}>
          {listingPhotoPaths?.map((photo, index) => (
            <div key={index} className="slide">
              <img
                className="slide-image"
                src={`http://localhost:3001/${photo.replace("public", "")}`}
                alt={`${index + 1}`}
              />
              <div
                className={`sliderButton prev ${theme === "dark" ? "":"inverted"}`}
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrevSlide(e)
                }}
              >
                «
              </div>
              <div
                className={`sliderButton next ${theme === "dark" ? "":"inverted"}`}
                onClick={(e) => {
                  e.stopPropagation()
                  goToNextSlide(e)
                }}
              >
                »
              </div>
            </div>
          ))}
        </div>
      </div>
      <h3>{city},{province}, {country}</h3>
      <p>{category}</p>
      {!booking ? (
        <>
          <p>{type}</p>
          <p><span>${price}</span> {texts.lCInfoText1}</p>
        </>
      )
        :
      (
        <>
          <p>{startDate} - {endDate}</p>
          <p><span>${totalPrice}</span> {texts.lCInfoText2}</p>
        </>
      )}
      <button
        className={`
          favorite-button
          ${theme === "light" ? "inverted":""}
          ${isLiked ? "liked":""}
        `}
        onClick={(e) => {
          e.stopPropagation();
          patchWishList()
        }}
        disabled={!user}
      ></button>
    </div>
  )
}

export default ListingCard