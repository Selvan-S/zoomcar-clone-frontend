import React, { useState } from "react";
import { useBooking } from "../context/BookingContext";

function TripProtection() {
  const { protectionPackage, setProtectionPackage } = useBooking();

  const [activeTripProtection, setActiveTripProtection] = useState({
    active: protectionPackage.selectedPrice,
  });
  return (
    <div
      className={`grid grid-cols-3 grid-rows-1 gap-x-2 max-sm:grid-rows-2 max-sm:grid-cols-2 mt-4 gap-2 max-w-4xl
    `}
    >
      <button
        className={`card bg-base-100 shadow-xl cursor-pointer
          ${
            activeTripProtection["active"] == "239"
              ? "border border-primary text-primary"
              : ""
          }`}
        onClick={() => {
          setActiveTripProtection({ active: "239" });
          setProtectionPackage({ selectedPrice: 239 });
        }}
      >
        <div className="card-body px-3 flex flex-col gap-3">
          <p className="text-sm">Basic</p>
          <h2 className="card-title">₹239</h2>
          <p className="description">
            Only pay Rs.3499 in case of any accidents
          </p>
        </div>
      </button>
      <button
        className={`card bg-base-100 shadow-xl cursor-pointer
        ${
          activeTripProtection["active"] == "289"
            ? "border border-primary text-primary"
            : ""
        }`}
        onClick={() => {
          setActiveTripProtection({ active: "289" });
          setProtectionPackage({ selectedPrice: 289 });
        }}
      >
        <div className="card-body px-3 flex flex-col gap-3">
          <p className="text-sm">Standard</p>
          <h2 className="card-title">₹289</h2>
          <p>Only pay Rs.999 in case of any accidents</p>
        </div>
      </button>
      <button
        className={`card bg-base-100 shadow-xl cursor-pointer ${
          activeTripProtection["active"] == "359"
            ? "border border-success text-success"
            : ""
        }`}
        onClick={() => {
          setActiveTripProtection({ active: "359" });
          setProtectionPackage({ selectedPrice: 359 });
        }}
      >
        <div className="card-body px-3 flex flex-col gap-3">
          <p className="text-sm">Peace of Mind</p>

          <h2 className="card-title">₹359</h2>
          <p className="description">Only pay Rs.99 in case of any accidents</p>
        </div>
      </button>
    </div>
  );
}

export default TripProtection;
