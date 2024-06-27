import React from "react";
import { useNavigate } from "react-router-dom";
import GetHostCarImage from "./GetHostCarImage";

function VehicleCard({ vehicle }) {
  const navigateTo = useNavigate();
  return (
    <div className="card max-sm:w-full max-md:w-72 w-96 bg-base-100 shadow-xl">
      {vehicle.hostCarImage?.length ? (
        <div className="carousel w-full">
          {vehicle.hostCarImage.map((image, index) => (
            <GetHostCarImage
              key={index}
              image={image}
              index={index}
              length={vehicle.hostCarImage.length}
              vehicleId={vehicle._id}
            />
          ))}
        </div>
      ) : (
        <figure>
          <img src="src\assets\placeholder.jpeg" alt={`${vehicle.name}`} />
        </figure>
      )}

      <div
        className="card-body cursor-pointer"
        onClick={() => navigateTo(`/vehicle/details/${vehicle._id}`)}
      >
        <h2 className="card-title">
          {vehicle.name}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>&#8377;{vehicle.pricePerHour}/hr</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{vehicle.seats} Seats</div>
          <div className="badge badge-outline">{vehicle.fuelType}</div>
          <div className="badge badge-outline">{vehicle.transmission}</div>
          <div
            className={`badge badge-outline ${
              vehicle.availability ? "text-success" : "text-error"
            } `}
          >
            {vehicle.availability ? "Available" : "Not Available"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleCard;
