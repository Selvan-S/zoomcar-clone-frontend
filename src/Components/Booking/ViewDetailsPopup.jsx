import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBooking } from "../context/BookingContext";
import { VehicleContext } from "../context/VehicleContext";
import { useContext } from "react";

export function ViewDetailsPopup({
  vehicleId,
  currentVehicleDetails,
  totalBookedHours,
}) {
  const { user } = useAuth();
  const { protectionPackage } = useBooking();
  const { currentSearchLocation } = useContext(VehicleContext);

  const priceOfTheVehicle =
    (currentVehicleDetails?.pricePerHour || 0) * totalBookedHours;
  const totalPrice = +protectionPackage.selectedPrice + 99 + priceOfTheVehicle;

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box max-sm:fixed max-sm:bottom-0 max-sm:w-full max-sm:max-w-full max-sm:rounded-l-none max-sm:rounded-b-none">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-2xl">
              ✕
            </button>
          </form>
          <div className="px-4 sm:px-0">
            <h3 className="text-xl font-semibold leading-7 ">
              {totalPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h3>
          </div>
          <div className="mt-2">
            <dl className="divide-y divide-gray-400">
              <div className="w-full px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-2 sm:px-0 flex justify-center max-sm:justify-between items-center">
                <dt className="text-sm font-medium leading-6 ">
                  Trip Amount (this does not include fuel)
                </dt>
                <dd className="mt-1 text-sm leading-6  sm:mt-0 text-right">
                  ₹{priceOfTheVehicle}
                </dd>
              </div>
              <div className="w-full px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-2 sm:px-0 flex justify-center max-sm:justify-between items-center">
                <dt className="text-sm font-medium leading-6 ">
                  Trip Protection Fee
                </dt>
                <dd className="mt-1 text-sm leading-6  sm:mt-0 text-right">
                  + ₹{protectionPackage.selectedPrice}
                </dd>
              </div>
              <div className="w-full px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-2 sm:px-0 flex justify-center max-sm:justify-between items-center">
                <dt className="text-sm font-medium leading-6 ">
                  Convenience Fee
                </dt>
                <dd className="mt-1 text-sm leading-6  sm:mt-0 text-right">
                  + ₹99
                </dd>
              </div>
              <div className="w-full px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-2 sm:px-0 flex justify-center max-sm:justify-between items-center">
                <dt className="text-sm leading-6 font-bold">Total Price</dt>
                <dd className="mt-1 text-sm leading-6  sm:mt-0 text-right font-bold">
                  {totalPrice.toLocaleString("en-US", {
                    style: "currency",
                    currency: "INR",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </dd>
              </div>
              <div className="w-full px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-2 sm:px-0 flex justify-center max-sm:justify-between items-center">
                <dt className="text-sm font-medium leading-6 ">
                  Refundable Deposit
                </dt>
                <dd className="mt-1 text-sm leading-6  sm:mt-0 text-right">
                  ₹0
                </dd>
              </div>
              <div className="w-full px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-2 sm:px-0 flex justify-center max-sm:justify-between items-center">
                <dt className="text-sm leading-6 font-bold">Final Amount </dt>
                <dd className="mt-1 text-sm leading-6  sm:mt-0 text-right font-bold">
                  {totalPrice.toLocaleString("en-US", {
                    style: "currency",
                    currency: "INR",
                  })}
                </dd>
              </div>
              <div className="w-full px-4 pt-6">
                {currentVehicleDetails?.availability ? (
                  <Link
                    to={user ? `/vehicle/booking/${vehicleId}` : "/login"}
                    state={{ currentVehicleDetails, isCurrentVehicle: true }}
                  >
                    <button className="btn btn-primary uppercase w-full">
                      {user ? "Confirm Booking" : "Login To Continue"}
                    </button>
                  </Link>
                ) : (
                  <Link
                    to={`${
                      currentSearchLocation
                        ? `/search?${currentSearchLocation}`
                        : "/"
                    }`}
                  >
                    <button className="btn btn-primary uppercase w-full">
                      Back to search
                    </button>
                  </Link>
                )}
              </div>
            </dl>
          </div>
        </div>
      </dialog>
    </div>
  );
}
