import React from "react";

function SearchBar({ onSearch, setMovie }) {
  return (
    <div>
      <input
        type="search"
        name="search-bar"
        id="search-bar"
        onChange={(e) => setMovie(e.target.value)}
      />
      <button onClick={onSearch}>search</button>
    </div>
  );
}

export default SearchBar;
