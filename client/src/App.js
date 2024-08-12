import { Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/HomePage';
import { SignUpPage } from './pages/SignUpPage';
import { LoginPage } from './pages/LoginPage';
import { useContext } from 'react';
import ThemeContext from './context/ThemeContext';
import CreateListing from './pages/CreateListing';
import { ScrollbarSimple } from './components/ScrollbarSimple';
import ListingDetails from './pages/ListingDetails';
import TripList from './pages/TripList';
import WishList from './pages/WishList';
import PropertyList from './pages/PropertyList';
import ReservationList from './pages/ReservationList';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';

function App() {
  const {themeConfig} = useContext(ThemeContext);

  return (
    <div className="App" style={{ background: themeConfig.background }}>
      <ScrollbarSimple/>
      <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="/sign-up" element={ <SignUpPage/> } />
        <Route path="/log-in" element={ <LoginPage/> } />
        <Route path="/create-listing" element={ <CreateListing/> } />
        <Route path="/properties/:listingId" element={ <ListingDetails/> } />
        <Route path="/properties/category/:category" element={ <CategoryPage/> } />
        <Route path="/properties/search/:search" element={ <SearchPage/> } />
        <Route path="/:userId/trips" element={ <TripList/> } />
        <Route path="/:userId/wish-list" element={ <WishList/> } />
        <Route path="/:userId/properties" element={ <PropertyList/> } />
        <Route path="/:userId/reservations" element={ <ReservationList/> } />
      </Routes>
    </div>
  );
}

export default App;
