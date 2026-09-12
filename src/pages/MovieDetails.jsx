import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./MovieDetails.css";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";

function MovieDetails() {
  const { imdbID } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getMovieDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${imdbID}&apikey=f7827d72`,
      );
      const data = await response.json();
      if (data.Response === "False") {
        setError("Something went wrong. Please try again.");
        return;
      }
      setMovieDetails(data);
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getMovieDetails();
  }, [imdbID]);
  if (error) {
    return <ErrorMessage error={error}></ErrorMessage>;
  }
  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <div className="movie-details-page">
      <button onClick={() => navigate(-1)} className="back-link">
        ← Back to Search{" "}
      </button>
      <div className="movie-details">
        <img src={movieDetails?.Poster} alt={movieDetails?.Title} />

        <div className="movie-info">
          <h1>{movieDetails?.Title}</h1>

          <p>
            <strong>Year:</strong> {movieDetails?.Year}
          </p>

          <p>
            <strong>Type:</strong> {movieDetails?.Type}
          </p>

          <p>
            <strong>Rated:</strong> {movieDetails?.Rated}
          </p>

          <p>
            <strong>Released:</strong> {movieDetails?.Released}
          </p>

          <p>
            <strong>Runtime:</strong> {movieDetails?.Runtime}
          </p>

          <p>
            <strong>Genre:</strong> {movieDetails?.Genre}
          </p>

          <p>
            <strong>Director:</strong> {movieDetails?.Director}
          </p>

          <p>
            <strong>Writer:</strong> {movieDetails?.Writer}
          </p>

          <p>
            <strong>Actors:</strong> {movieDetails?.Actors}
          </p>

          <h3>Plot</h3>

          <p>{movieDetails?.Plot}</p>

          <p>
            <strong>Language:</strong> {movieDetails?.Language}
          </p>

          <p>
            <strong>Country:</strong> {movieDetails?.Country}
          </p>

          <p>
            <strong>Awards:</strong>
            {movieDetails?.Awards}
          </p>

          <h3>Ratings</h3>

          {movieDetails?.Ratings?.map((rating) => (
            <p key={rating.Source}>
              <strong>{rating.Source}:</strong> {rating.Value}
            </p>
          ))}

          <p>
            <strong>IMDb Votes:</strong> {movieDetails?.imdbVotes}
          </p>

          {/* Movie-specific details */}
          {movieDetails?.Type === "movie" && (
            <p>
              <strong>Box Office:</strong> {movieDetails?.BoxOffice}
            </p>
          )}

          {/* Series-specific details */}
          {movieDetails?.Type === "series" && (
            <p>
              <strong>Total Seasons:</strong> {movieDetails?.totalSeasons}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
