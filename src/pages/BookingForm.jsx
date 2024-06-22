import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../Components/context/AuthContext";
import { useBooking } from "../Components/context/BookingContext";
import FullScreenLoading from "../Components/Common/FullScreenLoading";
import { getToken } from "../Components/Auth/auth";
function BookingForm() {
  const { id } = useParams();
  const { state } = useLocation();
  const {
    totalBookedHours,
    protectionPackage,
    pickupDateAndDropOffDate,
    pickupTimeAndDropoffTime,
  } = useBooking();

  const { user } = useAuth();
  const navigateTo = useNavigate();
  const [isLoading, setIsloading] = useState(false);

  let currentVehicleDetails = {
    _id: "",
    availability: true,
    carType: "",
    createdAt: ",",
    fuelType: "",
    hostCarImage: [],
    name: "",
    pricePerHour: 0,
    seats: "",
    transmission: "",
  };
  if (state && state.isCurrentVehicle) {
    currentVehicleDetails = state.currentVehicleDetails;
  }
  const priceOfTheVehicle =
    (currentVehicleDetails?.pricePerHour || 0) * totalBookedHours;
  const totalPrice = +protectionPackage.selectedPrice + 99 + priceOfTheVehicle;
  async function handleCheckout() {
    setIsloading(true);
    const stripe = await loadStripe(
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    );
    fetch(
      `${import.meta.env.VITE_ZOOM_CAR_CLONE_BASE_API_URL}/${
        import.meta.env.VITE_PAYMENT_BASE_URL
      }/create-checkout-session/${id}`,
      {
        method: "POST",
        body: JSON.stringify({
          startDate: pickupDateAndDropOffDate.startDate,
          endDate: pickupDateAndDropOffDate.endDate,
          startTime: pickupTimeAndDropoffTime.pickupTime,
          endTime: pickupTimeAndDropoffTime.dropoffTime,
          tripProtectionFee: protectionPackage.selectedPrice,
          items: [
            {
              id: currentVehicleDetails._id,
              totalPrice,
            },
          ],
        }),
        headers: {
          Authorization: `Bearer ${getToken()}`,

          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then((session) => {
        stripe.redirectToCheckout({
          sessionId: session.id,
        });
        console.log(session);
      })
      .catch((e) => {
        console.error(e.error);
      })
      .finally(() => {
        setIsloading(false);
      });
  }
  return (
    <div className="my-5 mx-3">
      <div className="grid grid-cols-3 mb-5 items-center">
        <dl className="divide-y divide-gray-400 col-span-3">
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
            <dt className="text-sm font-medium leading-6 ">Convenience Fee</dt>
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
            <dd className="mt-1 text-sm leading-6  sm:mt-0 text-right">₹0</dd>
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
          <div className="w-full px-4 py-6">
            <button
              className="btn btn-primary uppercase w-full"
              onClick={() => (user ? handleCheckout() : navigateTo("/login"))}
              disabled={isLoading}
            >
              {user ? "Checkout" : "Login To Continue"}
            </button>
          </div>
        </dl>
      </div>
      {isLoading && <FullScreenLoading />}
    </div>
  );
}

export default BookingForm;
