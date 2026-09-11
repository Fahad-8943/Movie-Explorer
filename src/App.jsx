import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const [movie, setMovie] = useState("");
  const [movieDetails, setMovieDetails] = useState(null);
  const clearSearch = () => {
    setMovie("");
    setMovieDetails(null);
  };

  return (
    <>
      <Header clearSearch={clearSearch} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              movie={movie}
              setMovie={setMovie}
              movieDetails={movieDetails}
              setMovieDetails={setMovieDetails}
            />
          }
        ></Route>
        <Route
          path="/MovieDetails/:imdbID/view"
          element={<MovieDetails />}
        ></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
