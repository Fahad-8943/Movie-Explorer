import apiService from "./apiService";

export const searchMovies = async (movie) => {
  const movies = await apiService("GET", "/search/movie", { query: movie }, {});
  return movies.data.results;
};

export const getMovieDetail = async (id) => {
  const movies = await apiService("GET", `/movie/${id}`, {append_to_response:"credits"}, {});
  return movies.data;
};

export const popularMovie = async () => {
  return await apiService("GET", "/movie/popular", {});
};

export const topRatedMovies = async () => {
  return await apiService("GET", "/movie/top_rated", {});
};
