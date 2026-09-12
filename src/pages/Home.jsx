import { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import "./Home.css";

function Home({ movie, setMovie, movieDetails, setMovieDetails }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    const searchValue = movie;
    if (searchValue.trim() === "") {
      alert("No search yet");
    } else {
      setMovieDetails(null);
      setError("");
      setLoading(true);

      try {
        const movieResponse = await fetch(
          `https://www.omdbapi.com/?s=${searchValue}&apikey=f7827d72`,
        );
        const data = await movieResponse.json();
        if (data.Response === "False") {
          setError("Movie not found. Try searching for another movie!");
          return;
        }
        const moviePromises = data?.Search.map((movie) => {
          return fetch(
            `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=f7827d72`,
          );
        });
        const responses = await Promise.all(moviePromises);
        const details = await Promise.all(
          responses.map((response) => {
            return response.json();
          }),
        );
        const completeMovies = data.Search.map((movie) => {
          const detail = details.find(
            (detail) => detail.imdbID === movie.imdbID,
          );
          return {
            ...movie,
            ...detail,
          };
        });
        // console.log(completeMovies);

        setMovieDetails(completeMovies);
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
