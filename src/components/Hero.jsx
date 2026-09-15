import React, { useEffect, useState } from "react";
import { getTrendingMovie } from "../api/allApi";
import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const data = await getTrendingMovie();

        const uniqueMovies = data.filter(
          (movie, index, self) =>
            index === self.findIndex((item) => item.id === movie.id),
        );

        setMovies(uniqueMovies.slice(0, 10));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  // Automatic sliding
  useEffect(() => {
    if (!movies.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [movies]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const previousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1,
    );
  };

  if (loading) {
    return <div className="hero-loading">Loading...</div>;
  }

  if (!movies.length) {
    return null;
  }

  const movie = movies[currentIndex];

  return (
    <section className="hero">
      {/* Background */}
      <div
        key={movie.id}
        className="hero-background"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      ></div>

      {/* Dark overlay */}
      <div className="hero-overlay"></div>

      {/* Previous button */}
      <button
        className="hero-arrow hero-arrow-left"
        onClick={previousSlide}
        aria-label="Previous movie"
      >
        ❮
      </button>

      {/* Movie content */}
      <div className="hero-content" key={movie.id}>
        <span className="hero-label">TRENDING THIS WEEK</span>

        <h1>{movie.title}</h1>

        <div className="hero-meta">
          <span>{movie.release_date?.slice(0, 4)}</span>
          <span>⭐ {movie.vote_average?.toFixed(1)}</span>
        </div>

        <p>{movie.overview}</p>

        <Link to={`/MovieDetails/${movie.id}/view`} className="hero-button">
          View Details
        </Link>
      </div>

      {/* Next button */}
      <button
        className="hero-arrow hero-arrow-right"
        onClick={nextSlide}
        aria-label="Next movie"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="hero-dots">
        {movies.map((movie, index) => (
          <button
            key={index}
            className={index === currentIndex ? "active" : ""}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
}

export default Hero;
