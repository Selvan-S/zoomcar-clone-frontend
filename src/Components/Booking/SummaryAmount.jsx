import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBooking } from "../context/BookingContext";
import { ViewDetailsPopup } from "./ViewDetailsPopup";
import { VehicleContext } from "../context/VehicleContext";

function SummaryAmount({ vehicleId, currentVehicleDetails }) {
  const { user } = useAuth();
  const { currentSearchLocation } = useContext(VehicleContext);

  const { protectionPackage, totalBookedHours } = useBooking();
  const priceOfTheVehicle =
    currentVehicleDetails.pricePerHour * totalBookedHours;
  const totalPrice = +protectionPackage.selectedPrice + 99 + priceOfTheVehicle;
  let navigateTo = useNavigate();
  return (
    <div className="fixed bottom-0 left-0 w-full sm:hidden">
      <div className="h-full px-4 bg-gray-50 dark:bg-gray-800 rounded-r-2xl rounded-t-2xl">
        <dl className="divide-y divide-gray-10">
          <div className="px-4 pb-4 sm:grid sm:grid-cols-2 sm:gap-2 sm:px-0 flex justify-between items-center pt-10">
            <dt className="text-sm font-medium leading-6 ">
              <span className="text-lg">Total Price</span> <br />
              <span className="text-xs text-gray-400">Inclusive of taxes</span>
            </dt>
            <dd className="mt-1 text-sm leading-6 sm:mt-0 justify-self-end text-right">
              {totalPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
              })}{" "}
              <br />
              <button
                className="text-primary"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                View Details
              </button>
            </dd>
          </div>
        </dl>

        <div className="w-full px-4">
          {currentVehicleDetails.availability ? (
            <Link
              to={user ? `/vehicle/booking/${vehicleId}` : "/login"}
              state={{ currentVehicleDetails, isCurrentVehicle: true }}
            >
              <button className="btn btn-primary uppercase w-full mb-8">
                {user ? "Confirm Booking" : "Login To Continue"}
              </button>
            </Link>
          ) : (
            <Link
              to={`${
                currentSearchLocation ? `/search?${currentSearchLocation}` : "/"
              }`}
            >
              <button className="btn btn-primary uppercase w-full">
                Back to search
              </button>
            </Link>
          )}
        </div>
      </div>
      <ViewDetailsPopup vehicleId={vehicleId} />
    </div>
  );
}

export default SummaryAmount;
