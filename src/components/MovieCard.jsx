import React from "react";
import "./MovieCard.css";
function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={movie.Title} />

      <div className="movie-info">
        <h2>{movie.Title}</h2>

        <p>
          <strong>Year:</strong> {movie.Year}
        </p>

        <p>
          <strong>IMDb Rating:</strong> ⭐ {movie.imdbRating}
        </p>

        <p>
          <strong>Plot:</strong> {movie.Plot}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
