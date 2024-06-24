import React from "react";
import VehicleImageGallery from "./VehicleImageGallery";

function SingleVehicleDetails({ currentVehicleDetails }) {
  return (
    <div className="single-vehicle-details overflow-auto flex justify-between flex-col gap-4">
      <VehicleImageGallery hostCarImage={currentVehicleDetails.hostCarImage} />
      <div className="card-body">
        <h2 className="card-title">
          {currentVehicleDetails.name}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>&#8377;{currentVehicleDetails.pricePerHour}/hr</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">
            {currentVehicleDetails.carType}
          </div>
          <div className="badge badge-outline">
            {currentVehicleDetails.seats} Seats
          </div>
          <div className="badge badge-outline">
            {currentVehicleDetails.fuelType}
          </div>
          <div className="badge badge-outline">
            {currentVehicleDetails.transmission}
          </div>
          <div
            className={`badge badge-outline ${
              currentVehicleDetails.availability ? "text-success" : "text-error"
            } `}
          >
            {currentVehicleDetails.availability ? "Available" : "Not Available"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleVehicleDetails;
