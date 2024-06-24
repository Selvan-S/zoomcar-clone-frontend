import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingAside from "../Booking/BookingAside";
import SummaryAmount from "../Booking/SummaryAmount";
import BackButton from "../Common/BackButton";
import Navbar from "../Common/Navbar";
import SectionTabs from "../Common/SectionTabs";
import TimeRangeSlider from "../Common/TimeRangeSlider";
import MainComponent from "../MainComponent/MainComponent";
import { useBooking } from "../context/BookingContext";
import { VehicleContext } from "../context/VehicleContext";
import { fetchVehiclesById } from "../services/vehicleService";
import SingleVehicleDetails from "./SingleVehicleDetails";
import FullScreenLoading from "../Common/FullScreenLoading";

const VehicleDetail = () => {
  const { id } = useParams();

  const { totalBookedHours } = useBooking();

  const {
    currentSearchLocation,
    currentVehicleDetails,
    setCurrentVehicleDetails,
  } = useContext(VehicleContext);
  const [loadingCurrentVehicle, setLoadingCurrentVehicle] = useState(false);
  useEffect(() => {
    setLoadingCurrentVehicle(true);
    const fetchVehicle = async () => {
      try {
        const data = await fetchVehiclesById(id);
        setCurrentVehicleDetails(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingCurrentVehicle(false);
      }
    };
    fetchVehicle();
  }, [id]);

  if (!currentVehicleDetails) {
    return <div>Loading...</div>;
  }
  return (
    <div className="">
      <MainComponent>
        <Navbar />
        <div className="w-screen bg-slate-800">
          <TimeRangeSlider />
        </div>
        <div className="vehicle-detail overflow-auto">
          <BackButton currentSearchLocation={currentSearchLocation} />
          <div className="flex px-2 gap-x-10">
            <div className="w-full flex justify-between flex-col">
              {/* Selected vehicle details card */}
              <SingleVehicleDetails
                currentVehicleDetails={currentVehicleDetails}
              />
              {/* Section tabs, which include reviews, protection fee details, and FAQs */}
              <SectionTabs currentVehicleDetails={currentVehicleDetails} />
            </div>
            {/* Containes price details and confirms booking to move on to the checkout stage. */}
            <BookingAside
              currentVehicleId={currentVehicleDetails._id}
              currentVehicleDetails={currentVehicleDetails}
              totalBookedHours={totalBookedHours}
            />
            {/* Mobile view - price details and confirms booking */}
            <SummaryAmount
              currentVehicleDetails={currentVehicleDetails}
              totalBookedHours={totalBookedHours}
            />
          </div>
          {loadingCurrentVehicle && <FullScreenLoading />}
        </div>
      </MainComponent>
    </div>
  );
};

export default VehicleDetail;
