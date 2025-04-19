  import React from 'react'
  import { useEffect, useState } from 'react'
  import axios from 'axios'
  import { useNavigate, useLocation, useParams } from 'react-router-dom';
  import "./Categories.css";

  const Genre = () => {
      const location = useLocation();
      const genreData = useParams();
      const [page, setpage] = useState(1);
      const pages = [1,2,3,4,5,7];
      console.log("genrename,id",genreData);

      const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreData.id}`

      const [movies, setMovies] = useState([]);

      useEffect(()=>{
          console.log(genreData);
          fetchActionMovies();
      },[genreData, page]);

        const navigate = useNavigate(); // a react hook can not be call inside a function
      
        function tomoviedetails(id){
          navigate("/moviedetails", {state: id});
        }

      const fetchActionMovies = async()=>{
          try {
              const response = await axios.post("http://localhost:3000/api/category/genre", {url: url});
              console.log("actionmovies response",response.data);
              if (!response.data || response.data.length === 0) {
                  console.log("No movies received from the backend");
                  return;
              }
              setMovies(response.data);
          } catch (error) {
              console.log("actionmovies error",error);
          }
      }

    return (
      <div>
        <div className="action-movies-container">
        <h1>{genreData.genrename} Movies</h1>
        {movies ? (
          <div>
          <ul>
            {movies.map((movie) => (
              <li key={movie.id} onClick={()=> tomoviedetails(movie.id)}>
                <div className="moviecard">
                  <div className="imgandname">

                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />

                    <h5 className='title'>{movie.title}</h5>

                  </div>
                  <div className="below">

                    <h6>📅{movie.release_date.split('-')[0]}</h6> {/* Fixed split() */}

                    <h6>⭐{movie.vote_average}</h6>
                  </div>
                </div>
              </li>
            ))}
          </ul>
            <div className="pageno">
              {
                pages.map((pageno)=> (
                  <button key={pageno} 
                  className={`pagenobtn ${page === pageno ? "active" : ""}`} 
                  onClick={()=> {setpage(pageno)}}>
                    {pageno}
                  </button>
                ))
              }
            </div>
          </div>
          ) : (
          <div className="loading-container">
            <h2>Loading...</h2>
          </div>
          )
          }
          </div>
      </div>
    )
  }

  export default Genre
