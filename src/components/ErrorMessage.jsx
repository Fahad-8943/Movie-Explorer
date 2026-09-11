import React from "react";

function ErrorMessage({ error }) {
  return (
    <div>
      <p>
        <strong>{error}</strong>
      </p>
    </div>
  );
}

export default ErrorMessage;
