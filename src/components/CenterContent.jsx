import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import NewlyLaunched from './categories/NewlyLaunched'; 
import MovieDetails from './MovieDetails';
import Action from './categories/Genre';
import Watchlist from './categories/Watchlist';
import Genre from "../components/categories/Genre"


const CenterContent = () => {

    const location = useLocation();
    const path = location.pathname;
    console.log("path", path);
    const genres = import.meta.env.VITE_GENRES 
    ? JSON.parse(import.meta.env.VITE_GENRES)
    : [];
    
  return (
      <Routes>
        <Route path="/" element={<NewlyLaunched />} />
        <Route path="/moviedetails" element={<MovieDetails />} />
        <Route path="/mywatchlist" element={<Watchlist />} />
        {/* Add other category routes here */}
        { genres.map((genre)=>(
          <Route path={`genre/:genrename/:id`} element={<Genre/>}/>
        ))}
      </Routes>

  )
}

export default CenterContent
