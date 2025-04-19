import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Categories.css"


const Watchlist = () => {
    const [user, setUser] = useState(null);
    const [watchlist, setwatchlist] = useState([]);

    useEffect(()=>{
        if(localStorage.getItem("user")){
            const parseduser = JSON.parse(localStorage.getItem("user"));
            setUser(parseduser);
            fetchWatchlist();
        }
    },[]);

    const fetchWatchlist = async()=>{
        const token = localStorage.getItem("token");
        if(!token){
            alert("please login to view watchlist");
            return;
        }
        try {
            const response = await axios.get("http://localhost:3000/api/watchlist/getwatchlist",{
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log("watchlist response",response.data);
            if(response.data.message === "Success"){
                setwatchlist(response.data.watchlist.watchlist);
                console.log("watchlist",response.data.watchlist.watchlist);
            }

        } catch (error) {
            console.log("error fetching watchlist",error);
        }
    }

    const navigate = useNavigate(); // a react hook can not be call inside a function
    
      function tomoviedetails(id){
        navigate("/moviedetails", {state: id});
      }


  return (
    <div>
        <div className="action-movies-container">
      <h1>Watchlist</h1>
      {
        user ? watchlist.length > 0 ? (
            <ul>
                {
                    watchlist.map((movie)=>(
                        <li key={movie.id} onClick={()=> tomoviedetails(movie.id)}>
                        <div className="moviecard">

                            <div className="imgandname">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            <h5>{movie.title}</h5>
                            </div>
                            <div className="below">
                            <h6>📅{movie.release_date.split('-')[0]}</h6> {/* Fixed split() */}
                            <h6>⭐{movie.vote_average}</h6>
                            </div>
                        </div>
                        </li>
                    ))
                }
            </ul>
        ):(
            <div className="loading-container">
                <h2>Your Watchlist is empty!</h2>
            </div>
        ) : (
            <h3>Please Login to view your watchlist</h3>
        )
      }
      </div>
    </div>
  )
}

export default Watchlist
