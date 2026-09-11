import React from "react";
import "./SearchBar.css";

function SearchBar({ onSearch, movie, setMovie }) {
  return (
    <div className="search-container">
      <input
        type="search"
        name="search-bar"
        id="search-bar"
        value={movie}
        onChange={(e) => setMovie(e.target.value)}
      />
      <button onClick={onSearch}>search</button>
    </div>
  );
}

export default SearchBar;
