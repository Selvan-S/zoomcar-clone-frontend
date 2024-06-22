import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import BookingAside from "../Booking/BookingAside";
import SummaryAmount from "../Booking/SummaryAmount";
import BackButton from "../Common/BackButton";
import Navbar from "../Common/Navbar";
import SectionTabs from "../Common/SectionTabs";
import MainComponent from "../MainComponent/MainComponent";
import { VehicleContext } from "../context/VehicleContext";
import { fetchVehiclesById } from "../services/vehicleService";
import VehicleImageGallery from "./VehicleImageGallery";
import { useBooking } from "../context/BookingContext";
import TimeRangeSlider from "../Common/TimeRangeSlider";

const VehicleDetail = () => {
  const { id } = useParams();

  const { totalBookedHours } = useBooking();

  const {
    currentSearchLocation,
    currentVehicleDetails,
    setCurrentVehicleDetails,
  } = useContext(VehicleContext);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const data = await fetchVehiclesById(id);
        setCurrentVehicleDetails(data);
      } catch (error) {
        console.error(error);
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
              <div className="single-vehicle-details overflow-auto flex justify-between flex-col gap-4">
                <VehicleImageGallery
                  hostCarImage={currentVehicleDetails.hostCarImage}
                />
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
                        currentVehicleDetails.availability
                          ? "text-success"
                          : "text-error"
                      } `}
                    >
                      {currentVehicleDetails.availability
                        ? "Available"
                        : "Not Available"}
                    </div>
                  </div>
                </div>
              </div>
              <SectionTabs />
            </div>
            <BookingAside
              currentVehicleId={currentVehicleDetails._id}
              currentVehicleDetails={currentVehicleDetails}
              totalBookedHours={totalBookedHours}
            />
            <SummaryAmount
              currentVehicleDetails={currentVehicleDetails}
              totalBookedHours={totalBookedHours}
            />
          </div>
        </div>
      </MainComponent>
    </div>
  );
};

export default VehicleDetail;
