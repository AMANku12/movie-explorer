import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewlyLaunched = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);    

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/homepage/newmovies");
        console.log("newmovies response", response.data);
        setMovies(response.data);
      } catch (error) {
        console.error("newmovies error", error);
        setError("Failed to fetch movies.");
      } finally {
        setLoading(false);  
      }
    };

    fetchMovies();
  }, []);

  function toMovieDetails(id) {
    navigate("/moviedetails", { state: id });
  }

  console.log("newly launched movies: ", movies);

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
        <ul>
          {movies.map((movie) => (
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
      )}
    </div>
  );
};

export default NewlyLaunched;
