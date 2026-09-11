import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

function PageNotFound() {
  return (
    <main className="page-not-found">
      <div className="page-not-found-content">
        <span className="error-code">404</span>

        <h1>Page Not Found</h1>

        <p>
          Looks like this movie scene doesn't exist.
          <br />
          Let's get you back to the movie collection.
        </p>

        <Link to="/" className="home-button">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}

export default PageNotFound;