import React, { useEffect, useState } from "react";
import { getTrendingMovie } from "../api/allApi";
import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

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

  const changeSlide = (newIndex) => {
    if (isChanging || !movies.length) return;

    setIsChanging(true);

    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsChanging(false);
    }, 350);
  };

  const nextSlide = () => {
    if (isChanging || !movies.length) return;

    const nextIndex =
      currentIndex === movies.length - 1 ? 0 : currentIndex + 1;

    changeSlide(nextIndex);
  };

  const previousSlide = () => {
    if (isChanging || !movies.length) return;

    const previousIndex =
      currentIndex === 0 ? movies.length - 1 : currentIndex - 1;

    changeSlide(previousIndex);
  };

  // Automatic sliding
  useEffect(() => {
    if (!movies.length) return;

    const interval = setInterval(() => {
      if (isChanging) return;

      setCurrentIndex((prevIndex) =>
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [movies, isChanging]);

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
        className={`hero-background ${isChanging ? "changing" : ""}`}
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
        disabled={isChanging}
        aria-label="Previous movie"
      >
        ❮
      </button>

      {/* Movie content */}
      <div className={`hero-content ${isChanging ? "changing" : ""}`}>
        <span className="hero-label">TRENDING THIS WEEK</span>

        <h1>{movie.title}</h1>

        <div className="hero-meta">
          <span>{movie.release_date?.slice(0, 4)}</span>

          <span>⭐ {movie.vote_average?.toFixed(1)}</span>
        </div>

        <p>{movie.overview}</p>

        <Link
          to={`/MovieDetails/${movie.id}/view`}
          className="hero-button"
        >
          View Details
        </Link>
      </div>

      {/* Next button */}
      <button
        className="hero-arrow hero-arrow-right"
        onClick={nextSlide}
        disabled={isChanging}
        aria-label="Next movie"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="hero-dots">
        {movies.map((movie, index) => (
          <button
            key={`${movie.id}-${index}`}
            className={index === currentIndex ? "active" : ""}
            onClick={() => changeSlide(index)}
            disabled={isChanging}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
}

export default Hero;