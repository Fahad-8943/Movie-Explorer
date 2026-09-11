import React from "react";
import "./MovieCard.css";

function MovieCard({ movie }) {
  return (
    <>
      <div class="movie-card">
        <img src={movie.Poster} alt={movie.Title} className="img-fluid" />

        <div class="movie-info">
          <h2>{movie.Title} </h2>
          <p>
            <strong>Year:</strong>
            {movie.Year}
          </p>

          <p>
            <strong>Type:</strong> {movie.Type}
          </p>
        </div>
      </div>
    </>
  );
}

export default MovieCard;
