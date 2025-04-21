import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewlyLaunched = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);    
  const [pageno, setpageno] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log(pageno);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/homepage/newmovies/${pageno}`);
        console.log("newmovies response", response);
        setMovies(prevMovies => [...prevMovies, ...response.data]);
      } catch (error) {
        console.error("newmovies error", error);
        setError("Failed to fetch movies.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchMovies();
  }, [pageno]);
  


  function toMovieDetails(id) {
    navigate("/moviedetails", { state: id });
  }


  return (
    <div className="action-movies-container">
      <h1>Now Playing</h1>

      {loading ? (
        <div className="loading-container">
          <h2>🔃🔃Loading🔃🔃</h2>
        </div>
      ) : error ? (
        <div className="error-container">
          <h2>{error}</h2>
        </div>
      ) : (
        <div className="moviescontainer">
        <ul>
          {movies.map((movie) => ( movie.release_date.slice(0,4)==="2025" &&
            <li key={movie.id} onClick={() => toMovieDetails(movie.id)}>
              <div className="moviecard">
                <div className="imgandname">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                  <h5>{movie.title}</h5>
                </div>
                <div className="below">
                  <h6>{movie.release_date.split('-')[0]}</h6>
                  <h6>{movie.vote_average}</h6>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="loadmore">
        <button id="loadmorebtn" onClick={()=> {setpageno(prevpageno => prevpageno+1)}}>Load More</button>
      </div>
        </div>
      )}
      
    </div>
  );
};

export default NewlyLaunched;
