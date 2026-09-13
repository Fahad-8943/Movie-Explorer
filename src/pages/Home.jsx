import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import "./Home.css";
import { popularMovie, searchMovies, topRatedMovies } from "../api/allApi";

function Home({ movie, setMovie, movieDetails, setMovieDetails }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [popularMovies, setPopularMovies] = useState([]);
  useEffect(() => {
    setPopularMovies(popularMovie());
    const topRatedResponse = topRatedMovies();

    console.log(popularMovies);
    console.log(topRatedResponse);
  }, []);
  const handleSearch = async () => {
    const searchValue = movie;
    if (searchValue.trim() === "") {
      alert("No search yet");
    } else {
      setMovieDetails(null);
      setError("");
      setLoading(true);

      try {
        setMovieDetails(await searchMovies(searchValue));
      } catch (error) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }

      // console.log(searchValue);
    }

    // console.log(movieDetails.Error);
  };

  return (
    <main className="home">
      <SearchBar onSearch={handleSearch} setMovie={setMovie} movie={movie} />

      {error && <ErrorMessage error={error} />}
      {loading && <Loader></Loader>}

      <MovieGrid movieDetails={movieDetails} />
    </main>
  );
}

export default Home;
