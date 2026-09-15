import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import "./Home.css";
import {
  getNowPlayingmovie,
  popularMovie,
  searchMovies,
  topRatedMovies,
} from "../api/allApi";
import Hero from "../components/Hero";
import MovieRow from "../components/MovieRow";

function Home({ movie, setMovie, movieDetails, setMovieDetails }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovie, setTopRatedMovie] = useState([]);
  const [nowPlayingMovie, setNowPlayingMovie] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [popular, topRated, nowPlaying] = await Promise.all([
          popularMovie(),
          topRatedMovies(),
          getNowPlayingmovie(),
        ]);

        setPopularMovies(popular);
        setTopRatedMovie(topRated);
        setNowPlayingMovie(nowPlaying);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
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
      <Hero />
      <SearchBar onSearch={handleSearch} setMovie={setMovie} movie={movie} />

      {error && <ErrorMessage error={error} />}
      {loading && <Loader></Loader>}

      <MovieGrid movieDetails={movieDetails} />

      <MovieRow title="Now Playing Movies" movies={nowPlayingMovie} />
      <MovieRow title="Popular Movies" movies={popularMovies} />
      <MovieRow title="Top Rated Movies" movies={topRatedMovie} />
    </main>
  );
}

export default Home;
