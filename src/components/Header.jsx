import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header({ clearSearch }) {
  return (
    <>
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo" onClick={clearSearch}>
            🎬 Movie Explorer
          </Link>

          <nav className="nav">
            <Link to="/" onClick={clearSearch}>
              Home
            </Link>
            <Link>Favorites</Link>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
