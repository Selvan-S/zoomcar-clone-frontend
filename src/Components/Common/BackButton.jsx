import React from "react";
import { useNavigate } from "react-router-dom";

function BackButton({ currentSearchLocation }) {
  const navigateTo = useNavigate();

  return (
    <button
      className="btn btn-primary my-5 mx-2"
      onClick={() =>
        navigateTo(
          `${currentSearchLocation ? `/search?${currentSearchLocation}` : "/"}`
        )
      }
    >
      <span className="mr-1">❮</span>
      <span>Back</span>
    </button>
  );
}

export default BackButton;
