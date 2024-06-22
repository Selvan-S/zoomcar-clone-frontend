import React from "react";
import ImageWithFallback from "../Common/ImageWithFallback";
import { useNavigate } from "react-router-dom";

function VehicleCard({ vehicle }) {
  const navigateTo = useNavigate();
  return (
    <div className="card max-sm:w-full max-md:w-72 w-96 bg-base-100 shadow-xl">
      {vehicle.hostCarImage.length ? (
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

function GetHostCarImage({ image, index, length, vehicleId }) {
  const imgId = Math.min(index + 1, length);
  const forward = ((index + 1) % length) + 1;
  const previous = index === 0 ? length : index;

  return (
    <div id={`${vehicleId}${imgId}`} className="carousel-item relative w-full">
      <ImageWithFallback
        vehicleDetails={false}
        src={`${image}`}
        fallback="src\assets\placeholder.jpeg"
        alt={`hostCarImage`}
        className="custom-image"
      />
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a
          href={`#${vehicleId}${previous}`}
          className="btn btn-circle max-md:text-xs"
        >
          ❮
        </a>
        <a href={`#${vehicleId}${forward}`} className="btn btn-circle">
          ❯
        </a>
      </div>
    </div>
  );
}

export default VehicleCard;
