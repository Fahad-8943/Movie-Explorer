import apiService from "./apiService";

export const searchMovies = async (movie) => {
  const movies = await apiService("GET", "/search/movie", { query: movie }, {});
  return movies.data.results;
};

export const getMovieDetail = async (id) => {
  const movies = await apiService(
    "GET",
    `/movie/${id}`,
    { append_to_response: "credits" },
    {},
  );
  return movies.data;
};

export const getNowPlayingmovie = async () => {
  const movies = await apiService("GET", "/movie/now_playing", {}, {});
  return movies.data.results;
};

export const getTrendingMovie = async () => {
  const movies = await apiService("GET", "/trending/movie/week", {}, {});
  return movies.data.results;
};
export const popularMovie = async () => {
  const movies = await apiService("GET", "/movie/popular", {});
  return movies.data.results;
};

export const topRatedMovies = async () => {
  const movies = await apiService("GET", "/movie/top_rated", {});
  return movies.data.results;
};
