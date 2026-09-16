import React from "react";
import MovieCard from "./MovieCard";
import "./MovieGrid.css";
import { Link } from "react-router-dom";

function MovieGrid({ movieDetails }) {
  // console.log(movieDetails);
  
  return (
    <>
      <div className="container">
        <div className="movie-grid">
          {movieDetails?.map((movie) => {
            return (
              <Link
                key={movie.id}
                to={`/MovieDetails/${movie.id}/view`}
              >
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
