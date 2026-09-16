import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./MovieDetails.css";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import { getMovieDetail } from "../api/allApi";

function MovieDetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getMovieDetails = async () => {
    const seenWriters = new Set();
    setLoading(true);
    try {
      const data = await getMovieDetail(id);
      // console.log(data);
      const cleanData = {
        ...data,
        director: data?.credits?.crew.find(
          (director) => director?.job === "Director",
        ),
        actors: data?.credits?.cast.slice(0, 5),
        writers: data?.credits?.crew.filter((person) => {
          const isWriter =
            person?.job === "Writer" ||
            person?.job === "Screenplay" ||
            person?.job === "Story";

          if (!isWriter) {
            return false;
          }

          if (seenWriters.has(person.id)) {
            return false;
          }

          seenWriters.add(person.id);
          return true;
        }),
      };
      // console.log(cleanData);

      setMovieDetails(cleanData);
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getMovieDetails();
  }, [id]);
  if (error) {
    return <ErrorMessage error={error}></ErrorMessage>;
  }
  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <div className="movie-details-page">
      <div
        className="movie-details"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieDetails?.backdrop_path})`,
        }}
      >
        {/* Back button */}
        <button onClick={() => navigate(-1)} className="back-link">
          ← Back to Search
        </button>

        {/* Main content */}
        <div className="movie-details-content">
          {/* LEFT SIDE */}
          <div className="movie-poster-section">
            <img
              className="movie-poster"
              src={
                "https://image.tmdb.org/t/p/w500/" + movieDetails?.poster_path
              }
              alt={movieDetails?.title}
            />

            {/* Production companies */}
            <div className="production-companies">
              <h3>Production</h3>

              <div className="production-company-list">
                {movieDetails?.production_companies?.map((company) => {
                  return (
                    <div className="production-company">
                      {company.logo_path ? (
                        <img
                          src={
                            "https://image.tmdb.org/t/p/w500/" +
                            company.logo_path
                          }
                          alt={company?.name}
                        />
                      ) : (
                        <span></span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="movie-info">
            <h1>{movieDetails?.title}</h1>

            <p className="tagline">{movieDetails?.tagline}</p>

            <div className="movie-meta">
              <span>{movieDetails?.release_date}</span>
              <span>{movieDetails?.runtime} Minutes</span>
              <span>⭐ {movieDetails?.vote_average}</span>
            </div>

            <div className="genres">
              {movieDetails?.genres?.map((gen) => {
                return <span>{gen?.name}</span>;
              })}
            </div>

            <h3>Overview</h3>
            <p>{movieDetails?.overview}</p>

            <h3>Director</h3>

            <div className="people-list">
              <div className="person-card" key={movieDetails?.director?.id}>
                <img
                  src={
                    "https://image.tmdb.org/t/p/w185/" +
                    movieDetails?.director?.profile_path
                  }
                  alt={movieDetails?.director?.name}
                />
                <span>{movieDetails?.director?.name}</span>
              </div>
            </div>

            <h3>Writers</h3>

            <div className="people-list">
              {movieDetails?.writers?.map((writer) => (
                <div className="person-card" key={writer.id}>
                  <img
                    src={
                      "https://image.tmdb.org/t/p/w185/" + writer.profile_path
                    }
                    alt={writer.name}
                  />
                  <span>{writer.name}</span>
                </div>
              ))}
            </div>

            <h3>Cast</h3>

            <div className="people-list">
              {movieDetails?.actors?.map((actor) => (
                <div className="person-card" key={actor.id}>
                  <img
                    src={
                      "https://image.tmdb.org/t/p/w185/" + actor.profile_path
                    }
                    alt={actor.name}
                  />

                  <span>{actor.name}</span>
                  <small>{actor.character}</small>
                </div>
              ))}
            </div>

            <div className="additional-details">
              <p>
                <strong>Release Date: </strong>
                {movieDetails?.release_date}
              </p>

              <p>
                <strong>Language: </strong>
                {movieDetails?.spoken_languages?.map((lang) => {
                  return <span>{lang?.name}, </span>;
                })}
              </p>

              <p>
                <strong>Country: </strong>
                {movieDetails?.production_countries?.map((count) => {
                  return <span>{count?.name}, </span>;
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
