import React from "react";
import { useParams } from "react-router-dom";
import BookingForm from "../Components/Booking/BookingForm";
import BackToVehicleDetails from "../Components/Common/BackToVehicleDetails";
import Footer from "../Components/Common/Footer";
import Navbar from "../Components/Common/Navbar";
import TimeRangeSlider from "../Components/Common/TimeRangeSlider";
import MainComponent from "../Components/MainComponent/MainComponent";

function BookingPage() {
  const { id } = useParams();
  return (
    <MainComponent>
      <Navbar />
      <BackToVehicleDetails lastVisitedCarId={id} />
      <div className="max-w-3xl mx-auto mt-10">
        <TimeRangeSlider />
        <BookingForm />
      </div>
      <Footer />
    </MainComponent>
  );
}

export default BookingPage;
