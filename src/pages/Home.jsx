import { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import ErrorMessage from "../components/ErrorMessage";

function Home() {
  const [movie, setMovie] = useState("");
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    const searchValue = movie;
    if (searchValue.trim() == "") {
      alert("No search yet");
    } else {
      setError("");

      try {
        const movieResponse = await fetch(
          `https://www.omdbapi.com/?s=${searchValue}&apikey=af55e318`,
        );
        setMovieDetails(await movieResponse.json());
      } catch (error) {
        setError("Something went wrong. Please try again.");
      }

      // console.log(searchValue);
    }

    // console.log(movieDetails.Error);
  };
  if (error) {
    return <ErrorMessage error={error}></ErrorMessage>;
  }
  return (
    <div>
      <SearchBar onSearch={handleSearch} setMovie={setMovie}></SearchBar>
      {movieDetails?.Response == "True" ? (
        <MovieGrid movieDetails={movieDetails}></MovieGrid>
      ) : (
        <ErrorMessage error={movieDetails?.Error}></ErrorMessage>
      )}
    </div>
  );
}

export default Home;
