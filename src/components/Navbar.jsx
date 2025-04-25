import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    if (localStorage.getItem("user")) {
      try {
        // Parsed the user from localStorage
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  const handlelogout = () => {
    console.log("logout clicked")
    localStorage.clear();
    setUser(null);
  }

  return (
    <div className="navbar">
      <h1 className="navbar-logo" onClick={()=> {navigate("/")}}>I LOVE MOVIES</h1>
      <span>--The website may work slow because the backend is deployed on Render free version--</span>
      
      <div className="navbar-auth">
        {user ? (
          <div className="user-info">
            <h3>{user.username || "User"}</h3>
            <button className="logout-btn" onClick={handlelogout}>Logout</button>
          </div>
        ) : (
          <Link to={"/auth"} className='Authbtn'>Login</Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
