import React, { useState } from "react";
import MainComponent from "../MainComponent/MainComponent";
import Navbar from "../Common/Navbar";
import { useBooking } from "../context/BookingContext";
import BookingCard from "./BookingCard";
import BackToGivenLocation from "../Common/BackToGivenLocation";

function UserBookings() {
  const { bookings } = useBooking();
  return (
    <div>
      <MainComponent>
        <Navbar />
        <BackToGivenLocation location={"/"} />
        {/* Display user Bookings */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-4 p-2">
          {!bookings?.length ? (
            <p className="col-span-3 text-center text-primary text-base">
              No bookings found. Book your vehicle and start your ride!
            </p>
          ) : (
            bookings.map((bookedVehicles, index) => (
              <BookingCard
                key={index}
                index={index}
                bookedVehicles={bookedVehicles}
              />
            ))
          )}
        </div>
      </MainComponent>
    </div>
  );
}

export default UserBookings;
