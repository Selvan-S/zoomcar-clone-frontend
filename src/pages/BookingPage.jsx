import React from "react";
import { useParams } from "react-router-dom";
import BackToVehicleDetails from "../Components/Common/BackToVehicleDetails";
import Navbar from "../Components/Common/Navbar";
import TimeRangeSlider from "../Components/Common/TimeRangeSlider";
import MainComponent from "../Components/MainComponent/MainComponent";
import BookingForm from "./BookingForm";

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
    </MainComponent>
  );
}

export default BookingPage;
