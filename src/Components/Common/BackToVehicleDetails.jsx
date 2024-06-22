import React from "react";
import { useNavigate } from "react-router-dom";

function BackToVehicleDetails({ lastVisitedCarId }) {
  const navigateTo = useNavigate();
  return (
    <button
      className="btn btn-primary my-5 mx-2"
      onClick={() =>
        navigateTo(
          `${
            lastVisitedCarId != "undefined"
              ? `/vehicle/details/${lastVisitedCarId}`
              : "/"
          }`
        )
      }
    >
      <span className="mr-1">❮</span>
      <span>Back</span>
    </button>
  );
}

export default BackToVehicleDetails;
