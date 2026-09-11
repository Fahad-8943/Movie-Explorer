import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import { Routes, Route } from "react-router-dom";

function App() {
  
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/MovieDetails/:imdbID/view"
          element={<MovieDetails />}
        ></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
