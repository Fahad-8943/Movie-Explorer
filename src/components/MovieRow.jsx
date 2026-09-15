import React from "react";
import { Link } from "react-router-dom";
import "./MovieRow.css";

function MovieRow({ title, movies }) {
  return (
    <section className="movie-row">
      <div className="movie-row-header">
        <h2>{title}</h2>
      </div>

      <div className="movie-row-list">
        {movies?.map((movie) => (
          <Link
            key={movie.id}
            to={`/MovieDetails/${movie.id}/view`}
            className="movie-row-card"
          >
            <div className="movie-row-poster">
              <img
                src={
                  "https://image.tmdb.org/t/p/w500" + movie.poster_path
                }
                alt={movie.title}
              />

              <div className="movie-row-rating">
                ⭐ {movie.vote_average?.toFixed(1)}
              </div>
            </div>

            <div className="movie-row-info">
              <h3>{movie.title}</h3>

              <span>
                {movie.release_date?.slice(0, 4)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default MovieRow;