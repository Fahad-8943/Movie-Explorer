import React from "react";
import "./MovieCard.css";
function MovieCard({ movie }) {

  return (
    <div className="movie-card">
      <img
        src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
        alt={movie.title}
      />

      <div className="movie-info">
        <h2>{movie.title}</h2>

        <p>
          <strong>Release Date:</strong> {movie.release_date}
        </p>

        <p>
          <strong>IMDb Rating:</strong> ⭐ {movie.vote_average}
        </p>

        <p>
          <strong>Overview:</strong> {movie.overview}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
