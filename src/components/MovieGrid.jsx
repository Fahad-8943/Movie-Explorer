import React from "react";
import MovieCard from "./MovieCard";
import "./MovieGrid.css";
import { Link } from "react-router-dom";

function MovieGrid({ movieDetails }) {
  return (
    <>
      <div className="container">
        <div className="movie-grid">
          {movieDetails?.Search?.map((movie) => {
            return (
              <Link to={`/MovieDetails/${movie.imdbID}/view`}>
                <MovieCard movie={movie}></MovieCard>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default MovieGrid;
