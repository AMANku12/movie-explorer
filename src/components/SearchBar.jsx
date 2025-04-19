import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'
import "./SearchBar.css";
import { useNavigate, Link } from 'react-router-dom';
import useDebounce from './Hooks/Debounce';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const navigate = useNavigate();
    
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const url = `https://api.themoviedb.org/3/search/movie?query=${debouncedSearchTerm}&include_adult=true&language=en-US&page=1`;

    useEffect(()=>{
        if(debouncedSearchTerm && debouncedSearchTerm.length > 2){
            const fetchMovies = async () => {
                try {
                    const response = await axios.get(url, {
                        headers: {  
                            Authorization: `Bearer ${API_KEY}`,
                        },
                    });
                    setSearchResults(response.data.results);
                    console.log("search results",response.data.results);
                    setSearchResults(response.data.results);
                    setShowSuggestions(true);
                } catch (error) {
                    console.error("Error fetching search results:", error);
                }
            };
            fetchMovies();
        }else if (debouncedSearchTerm.length === 0) {
            setSearchResults([]);
            setShowSuggestions(false);
        }
    },[debouncedSearchTerm]);

    useEffect(() => {
        return () => {
            setSearchTerm('');
            setSearchResults([]);
            setShowSuggestions(false);
        };
    }, []);
    
    function handleclick(id){
        setSearchTerm('');
        setSearchResults([]);
        setShowSuggestions(false);
        navigate("/moviedetails", { state: id  });
    }

    const handleclear = () => {
        setSearchTerm('');
        setSearchResults([]);
        setShowSuggestions(false);
    }

    return (
        <div className="search-container">
            <div className="upper">
                <input 
                    id="searchbar" 
                    type="text" 
                    placeholder="Search for movies..." 
                    value={searchTerm} 
                    onChange={(e)=> {setSearchTerm(e.target.value)}}
                />
                <button onClick={handleclear} id='clear'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </button>
            </div>
            {showSuggestions && searchResults.length > 0 && (
                <ul className='searchresults'>
                    {searchResults && searchResults.slice(0,5).map((movie)=>(
                        <li className='searchcard' key={movie.id} onClick={()=> handleclick(movie.id)}>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
                            <span>{movie.title}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default SearchBar