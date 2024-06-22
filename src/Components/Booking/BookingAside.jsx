import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBooking } from "../context/BookingContext";
import { VehicleContext } from "../context/VehicleContext";
import { ViewDetailsPopup } from "./ViewDetailsPopup";

function BookingAside({
  currentVehicleId,
  currentVehicleDetails,
  totalBookedHours,
}) {
  const benefits_tab = document.getElementById("benefits-tab");
  const { currentSearchLocation } = useContext(VehicleContext);
  const { protectionPackage } = useBooking();
  const { user } = useAuth();

  const priceOfTheVehicle =
    (currentVehicleDetails?.pricePerHour || 0) * totalBookedHours;
  const totalPrice = +protectionPackage.selectedPrice + 99 + priceOfTheVehicle;
  return (
    <aside
      id="booking-sidebar"
      className="fixed right-0 bottom-0 booking-aside max-sm:translate-x-96"
      aria-label="Sidebar"
    >
      <div className="h-full px-5 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <div className="">
          <dl className="divide-y divide-gray-10">
            <div className="w-full px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-2 sm:px-0 flex justify-center items-center">
              <dt className="text-sm font-medium leading-6">
                Trip Protection Package (Secure Plus){" "}
                <button
                  className="link no-underline link-primary"
                  onClick={() => benefits_tab.click()}
                >
                  Change
                </button>
              </dt>
              <dd className="mt-1 text-sm leading-6  sm:mt-0 text-right">
                ₹{protectionPackage.selectedPrice}
              </dd>
            </div>
            <div className="w-full px-4 pb-4 sm:grid sm:grid-cols-2 sm:gap-2 sm:px-0 flex justify-center items-center pt-10">
              <dt className="text-sm font-medium leading-6 ">
                <span className="text-lg">Total Price</span> <br />
                <span className="text-xs text-gray-400">
                  Inclusive of taxes
                </span>
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
        </div>
        <div className="w-full px-4">
          {currentVehicleDetails.availability ? (
            <Link
              to={user ? `/vehicle/booking/${currentVehicleId}` : "/login"}
              state={{ currentVehicleDetails, isCurrentVehicle: true }}
            >
              <button className="btn btn-primary uppercase w-full">
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
      <ViewDetailsPopup
        vehicleId={currentVehicleId}
        currentVehicleDetails={currentVehicleDetails}
        totalBookedHours={totalBookedHours}
      />
    </aside>
  );
}

export default BookingAside;
