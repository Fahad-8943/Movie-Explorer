import "./SearchBar.css";

function SearchBar({ onSearch, movie, setMovie }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <input
        type="search"
        name="search-bar"
        id="search-bar"
        value={movie}
        onChange={(e) => setMovie(e.target.value)}
        placeholder="Search for a movie"
        aria-label="Search for a movie"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
