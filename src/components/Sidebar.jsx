
import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Sidebar.css"



function Sidebar() {

  const genres = import.meta.env.VITE_GENRES 
  ? JSON.parse(import.meta.env.VITE_GENRES)
  : [];


  return (
    <div className="categories">
      <ul>
        <li>
          {/* NavLink-> special type of link that knows if it is active */}
          <NavLink className="linktag" to="/mywatchlist">Watchlist</NavLink>
        </li>

        {genres.map((genre)=>(
          <li>
            <NavLink className="linktag" to={`/genre/${genre.name.toLowerCase()}/${genre.id}`}>
              {genre.name}
            </NavLink>
          </li>
        ))}

      </ul>
    </div>
  );
}

export default Sidebar;