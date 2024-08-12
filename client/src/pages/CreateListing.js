import React, { useContext, useEffect, useState } from "react";
import "../styles/CreateListing.css";
import { Navbar } from "../components/Navbar";
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";
import { categorias, categories, types, tipos, instalaciones, facilities } from "../data.js";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ImageIco from "../assets/icons/Image-ico.png";
import DeleteIco from "../assets/icons/Delete-ico.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer.js";

const CreateListing = () => {
  const { texts, language } = useContext(LanguageContext);
  const { themeConfig, theme } = useContext(ThemeContext);
  const [category, setCategory] = useState(categorias);
  const [type, setType] = useState(tipos);
  const [facility, setFacility] = useState(instalaciones);
  const navigate = useNavigate();

  const [photos, setPhotos] = useState([]);
  const [categorySelect, setCategorySelect] = useState("");
  const [typeSelect, setTypeSelect] = useState("");
  const [amenitiesSelect, setAmenitiesSelect] = useState([]);
  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    province: "",
    country: "",
  });

  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDesc: "",
    price: 0
  });

  const handleSelectAmenities = (facilityS) => {
    if (amenitiesSelect.includes(facilityS)) {
      setAmenitiesSelect((prevAmenities) => prevAmenities.filter((option) => option !== facilityS));
    } else {
      setAmenitiesSelect((prev) => [...prev, facilityS]);
    }
  }

  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({
      ...formLocation,
      [name]: value
    });
  }

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  }

  const handleDragPhoto = (result) => {
    if (!result.destination) { return; }
    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  }

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, index) => index !== indexToRemove))
  }

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({
      ...formDescription,
      [name]: value
    })
  }

  const creatorId = useSelector((state) => state.user._id)

  const handlePost = async (e) => {
    e.preventDefault()
    try{
      const listingForm = new FormData();
      listingForm.append("creator", creatorId);
      listingForm.append("category", categorySelect);
      listingForm.append("type", typeSelect);
      listingForm.append("streetAddress", formLocation.streetAddress);
      listingForm.append("aptSuite", formLocation.aptSuite);
      listingForm.append("city", formLocation.city);
      listingForm.append("province", formLocation.province);
      listingForm.append("country", formLocation.country);
      listingForm.append("guestCount", guestCount);
      listingForm.append("bedroomCount", bedroomCount);
      listingForm.append("bedCount", bedCount);
      listingForm.append("bathroomCount", bathroomCount);
      listingForm.append("amenities", amenitiesSelect);
      listingForm.append("title", formDescription.title);
      listingForm.append("description", formDescription.description);
      listingForm.append("highlight", formDescription.highlight);
      listingForm.append("highlightDesc", formDescription.highlightDesc);
      listingForm.append("price", formDescription.price);

      photos.forEach((photo) => {
        listingForm.append("listingPhotos", photo)
      })

      const response = await fetch("http://localhost:3001/properties/create", {
        method : "POST",
        body : listingForm
      })

      if(response.ok){
        navigate("/")
      }
    }catch(err){
      console.log("Publish Listing failed", err.message)
    }
  }

  useEffect(() => {
    if (language === "es") {
      setCategory(categorias);
      setType(tipos);
      setFacility(instalaciones);
    }
    else {
      setCategory(categories);
      setType(types);
      setFacility(facilities);
    }
  }, [language]);

  return (
    <>
      <Navbar />
      <div className="createListing-cont" style={{ color: themeConfig.color }}>
        <h1 className="createListing-title">{texts.cLTitle}</h1>
        <form
          className="createListing-form"
          style={{ backgroundColor: themeConfig.backgroundElement }}
          onSubmit={handlePost}
        >
          <div className="createListing step1" style={{ backgroundColor: themeConfig.backgroundElement }}>
            <h2 className="createListing-stepText">{texts.cLStep1Text}</h2>
            <hr className="createListing-hr" style={{ background: themeConfig.color }} />
            <h3 className="createListing-stepText h1">{texts.cLStep1Text1}</h3>
            <div className="createListing-categoryList" style={{ backgroundColor: themeConfig.backgroundElement }}>
              {category?.map((item, index) => (
                <div
                  className={`
                    categorySel-cont
                    ${categorySelect === item.ref ? "selected" : ""}
                    ${theme === "light" ? "inverted" : ""}
                  `}
                  key={index}
                  onClick={() => setCategorySelect(item.ref)}
                >
                  <img
                    className={`categorySel-icon ${theme === "dark" ? "" : "inverted"}`}
                    src={item.icon}
                    alt=""
                  />
                  <p className="categorySel-text">{item.label}</p>
                </div>
              ))}
            </div>
            <h3 className="createListing-stepText h2">{texts.cLStep1Text2}</h3>
            <div className="createListing-typeList" style={{ backgroundColor: themeConfig.backgroundElement }}>
              {type?.map((item, index) => (
                <div
                  className={`
                    typeSel-cont
                    ${typeSelect === item.ref ? "selected" : ""}
                    ${theme === "light" ? "inverted" : ""}
                  `}
                  key={index}
                  onClick={() => setTypeSelect(item.ref)}
                >
                  <div className="typeSel-text">
                    <h4 className="typeSel-title">{item.name}</h4>
                    <p className="typeSel-description">{item.desciption}</p>
                  </div>
                  <img
                    className={`typeSel-icon ${theme === "dark" ? "" : "inverted"}`}
                    src={item.icon}
                    alt=""
                  />
                </div>
              ))}
            </div>
            <h3 className="createListing-stepText h3">{texts.cLStep1Text3}</h3>
            <div className="location-cont" style={{ backgroundColor: themeConfig.backgroundElement }}>
              <div className="locationCont address">
                <p className="location-address">{texts.cLStep1Text3a}</p>
                <input
                  className={`location addressTxt ${theme === "dark" ? "" : "inverted"}`}
                  type="text"
                  placeholder={texts.cLStep1Text3a}
                  name="streetAddress"
                  value={formLocation.streetAddress}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="locationCont apartment">
                <p className="location-apartment">{texts.cLStep1Text3b}</p>
                <input
                  className={`location region apartmentTxt ${theme === "dark" ? "" : "inverted"}`}
                  type="text"
                  placeholder={texts.cLStep1Text3b}
                  name="aptSuite"
                  value={formLocation.aptSuite}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="locationCont city">
                <p className="location-city">{texts.cLStep1Text3c}</p>
                <input
                  className={`location region cityTxt ${theme === "dark" ? "" : "inverted"}`}
                  type="text"
                  placeholder={texts.cLStep1Text3c}
                  name="city"
                  value={formLocation.city}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="locationCont province">
                <p className="location-province">{texts.cLStep1Text3d}</p>
                <input
                  className={`location region provinceTxt ${theme === "dark" ? "" : "inverted"}`}
                  type="text"
                  placeholder={texts.cLStep1Text3d}
                  name="province"
                  value={formLocation.province}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="locationCont country">
                <p className="location-country">{texts.cLStep1Text3e}</p>
                <input
                  className={`location region countryTxt ${theme === "dark" ? "" : "inverted"}`}
                  type="text"
                  placeholder={texts.cLStep1Text3e}
                  name="country"
                  value={formLocation.country}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>
            <h3 className="createListing-stepText 4">{texts.cLStep1Text4}</h3>
            <div className="basics-cont" style={{ backgroundColor: themeConfig.backgroundElement }}>
              <div className="basic guests" style={{ borderColor: themeConfig.borderColor }}>
                <p className="basics-text">{texts.cLStep1Text4a}</p>
                <div className="basics-counter">
                  <p className="counter minus" onClick={() => { guestCount > 1 && setGuestCount(guestCount - 1) }}>-</p>
                  <p className="counter number">{guestCount}</p>
                  <p className="counter plus" onClick={() => { setGuestCount(guestCount + 1) }}>+</p>
                </div>
              </div>
              <div className="basic bedrooms">
                <p className="basics-text">{texts.cLStep1Text4b}</p>
                <div className="basics-counter">
                  <p className="counter minus" onClick={() => { bedroomCount > 1 && setBedroomCount(bedroomCount - 1) }}>-</p>
                  <p className="counter number">{bedroomCount}</p>
                  <p className="counter plus" onClick={() => { setBedroomCount(bedroomCount + 1) }}>+</p>
                </div>
              </div>
              <div className="basic beds">
                <p className="basics-text">{texts.cLStep1Text4c}</p>
                <div className="basics-counter">
                  <p className="counter minus" onClick={() => { bedCount > 1 && setBedCount(bedCount - 1) }}>-</p>
                  <p className="counter number">{bedCount}</p>
                  <p className="counter plus" onClick={() => { setBedCount(bedCount + 1) }}>+</p>
                </div>
              </div>
              <div className="basic bathrooms">
                <p className="basics-text">{texts.cLStep1Text4d}</p>
                <div className="basics-counter">
                  <p className="counter minus" onClick={() => { bathroomCount > 1 && setBathroomCount(bathroomCount - 1) }}>-</p>
                  <p className="counter number">{bathroomCount}</p>
                  <p className="counter plus" onClick={() => { setBathroomCount(bathroomCount + 1) }}>+</p>
                </div>
              </div>
            </div>
          </div>
          <div className="createListing step2" style={{ backgroundColor: themeConfig.backgroundElement }}>
            <h2 className="createListing-stepText">{texts.cLStep2Text}</h2>
            <hr className="createListing-hr" style={{ background: themeConfig.color }} />
            <h3 className="createListing-stepText h5">{texts.cLStep2Text1}</h3>
            <div className="amenities-cont" style={{ background: themeConfig.backgroundElement }}>
              {facility?.map((item, index) => (
                <div
                  className={`
                    createListing2 facility
                    ${amenitiesSelect.includes(item.ref) ? "selected" : ""}
                    ${theme === "light" ? "inverted" : ""}
                  `}
                  key={index}
                  onClick={() => handleSelectAmenities(item.ref)}
                >
                  <img
                    className={`facility-icon ${theme === "dark" ? "" : "inverted"}`}
                    src={item.icon}
                    alt=""
                  />
                  <p className="facility-text">{item.name}</p>
                </div>
              ))}
            </div>
            <h3 className="createListing-stepText h6">{texts.cLStep2Text2}</h3>
            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="photos"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ background: themeConfig.backgroundElement }}
                  >
                    {photos.length < 1 && (
                      <>
                        <input
                          className="photos-input"
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label className="photos-label l1" htmlFor="image">
                          <img
                            className={`photos-icon ${theme === "dark" ? "" : "inverted"}`}
                            alt=""
                            src={ImageIco}
                          />
                          <p className="photos-text">{texts.cLStep2Text3}</p>
                        </label>
                      </>
                    )}
                    {photos.length >= 1 && (
                      <>
                        {photos.map((photo, index) => {
                          return (
                            <Draggable
                              key={index}
                              draggableId={index.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="photo"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <img className="photo-post" src={URL.createObjectURL(photo)} alt="place" />
                                  <button
                                    className="delete-button"
                                    type="button"
                                    onClick={() => handleRemovePhoto(index)}
                                  >
                                    <img className="delete-icon" src={DeleteIco} alt="" />
                                  </button>
                                </div>
                              )}
                            </Draggable>
                          )
                        })}
                        <input
                          className="photos-input"
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label className="photos-label l2" htmlFor="image">
                          <img
                            className={`photos-icon ${theme === "dark" ? "" : "inverted"}`}
                            alt=""
                            src={ImageIco}
                          />
                          <p className="photos-text">{texts.cLStep2Text3}</p>
                        </label>
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <h3 className="createListing-stepText h7">{texts.cLStep2Text4}</h3>
            <div
              className="description"
              style={{
                background: themeConfig.backgroundElement,
                borderRadius: themeConfig.borderRadius
              }}
            >
              <p className="description-text">{texts.cLStep2Text4a}</p>
              <input
                className="description-input i1"
                type="text"
                placeholder={texts.cLStep2Text4a}
                name="title"
                required
                style={{ border: themeConfig.border }}
                value={formDescription.title}
                onChange={handleChangeDescription}
              />
              <p className="description-text">{texts.cLStep2Text4b}</p>
              <textarea
                className="description-input i2"
                type="text"
                placeholder={texts.cLStep2Text4b}
                name="description"
                required
                style={{ border: themeConfig.border }}
                value={formDescription.desciption}
                onChange={handleChangeDescription}
              />
              <p className="description-text">{texts.cLStep2Text4c}</p>
              <input
                className="description-input i3"
                type="text"
                placeholder={texts.cLStep2Text4c}
                name="highlight"
                required
                style={{ border: themeConfig.border }}
                value={formDescription.highlight}
                onChange={handleChangeDescription}
              />
              <p className="description-text">{texts.cLStep2Text4d}</p>
              <textarea
                className="description-input i4"
                type="text"
                placeholder={texts.cLStep2Text4d}
                name="highlightDesc"
                required
                style={{ border: themeConfig.border }}
                value={formDescription.highlightDesc}
                onChange={handleChangeDescription}
              />
              <p className="description-text">{texts.cLStep2Text4e}</p>
              <div className="descriptionCont price">
                <span className="description-span">$</span>
                <input
                  className="description-input i5"
                  type="number"
                  placeholder="100"
                  name="price"
                  min={0}
                  required
                  style={{ border: themeConfig.border }}
                  value={formDescription.price}
                  onChange={handleChangeDescription}
                />
              </div>
            </div>
          </div>
          <button
            className={`submit-btn ${theme === "light" ? "inverted":""}`}
            type="submit"
            style={{ background: themeConfig.backgroundButton}}
          >
            {texts.cLStep3Text1}
          </button>
        </form>
      </div>
      <Footer/>
    </>
  )
}

export default CreateListing