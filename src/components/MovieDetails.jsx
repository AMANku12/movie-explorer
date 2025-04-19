import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./MovieDetails.css";

const MovieDetails = () => {
    const location = useLocation();
    const movieId = location.state;
    const url = `https://api.themoviedb.org/3/movie/${movieId}`;
    const [moviedetails, setMovieDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [inwatchlist, setinwatchlist] = useState(false);

    useEffect(() => {
        if (movieId) {
            console.log("movieId", movieId);
            fetchDetails();
        } else {
            console.error("movieId is undefined");
            setLoading(false); // Stop loading if movieId is missing
        }
    }, [movieId]);

    useEffect(() => {
        if(localStorage.getItem("user")){
            const parseduser = localStorage.getItem("user");
            setUser(JSON.parse(parseduser));
            const temp = JSON.parse(parseduser);
            console.log("initial watchlist", temp.watchlist);
        }
    }, []);

    useEffect(() => {
        if (user && moviedetails) {
            const isinwatchlist = user.watchlist.some(movie => movie.id === moviedetails.id);
            setinwatchlist(isinwatchlist);
        } else {
            setinwatchlist(false);
        }
    }, [user, moviedetails]);

    const fetchDetails = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/detail/moviedetails`, { url: url });
            console.log("moviedetails response", response.data);
            setMovieDetails(response.data);
            setLoading(false);
        } catch (error) {
            console.log("moviedetails error", error);
            setLoading(false);
        }
    };

    const handleAddtoWatchlist = async (moviedetails) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login again to add to watchlist");
            return;
        }
        try {
            const response = await axios.post("http://localhost:3000/api/watchlist/addtowatchlist", { moviedetails }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (response.data.message === "Success") {
                alert("Movie added to watchlist successfully");
                console.log(response.data.updateduser);
                localStorage.setItem("user", JSON.stringify(response.data.updateduser));
                setUser(response.data.updateduser);
            }
        } catch (error) {
            console.log("Error adding to watchlist", error);
        }
    };

    const handleRemoveFromWatchlist = async(movieId)=>{
        const token = localStorage.getItem("token");
        if(!token){
            alert("Please login again");
            return
        }
        try {
            const response = await axios.post("http://localhost:3000/api/watchlist/removefromwatchlist",{movieId},{ headers:{
                Authorization: `Bearer ${token}`
            }});
            
            console.log(response.data);
            if(response.data.message==="Success"){
                alert("Movie removed from watchlist");
                localStorage.setItem("user", JSON.stringify(response.data.updateduser));
                setUser(response.data.updateduser);
            }

        } catch (error) {
            console.log("remove from watchlist error:",error);
        }
    }

    if (loading) {
        return (
            <div className="loading-container">
                <h2>Loading...</h2>
            </div>
        );
    }

    return (
        <div>
            {moviedetails ? (
                <div className='moviedetails-container'>
                    <div className="poster">
                        <img src={`https://image.tmdb.org/t/p/w500${moviedetails.poster_path}`} alt="#" />
                    </div>
                    <div className="details">
                        <div className="headingline">
                            <h1 id='title'>{moviedetails.title}</h1>
                            <button onClick={() => { navigate(-1) }}>🔙</button>
                        </div>
                        {moviedetails.tagline && moviedetails.tagline.length !== 0 && <p>🔥{moviedetails.tagline}🔥</p>}
                        <p>Discription: {moviedetails.overview}</p>
                        <p>Release Date:📅 {moviedetails.release_date}</p>
                        <p>Rating:⭐ {moviedetails.vote_average}</p>
                        <p>Genres: {moviedetails.genres && Array.isArray(moviedetails.genres) && moviedetails.genres.map((genre) => genre.name).join(', ')}</p>
                        {user ? inwatchlist ? (
                            <button onClick={()=> handleRemoveFromWatchlist(moviedetails.id)}>Remove From Watchlist</button>
                        ) : (
                            <button onClick={() => handleAddtoWatchlist(moviedetails)}>Add to watchlist</button>
                        ) : (
                            <button onClick={()=>{alert("Login!!")}}>Login to add to watchlist</button>
                        )}
                    </div>
                </div>
            ) : (
                <div className="loading-container">
                    <h2>Loading...</h2>
                </div>
            )}
        </div>
    );
};

export default MovieDetails;
