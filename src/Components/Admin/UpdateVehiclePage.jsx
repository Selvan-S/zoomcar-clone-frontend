import React from "react";
import MainComponent from "../MainComponent/MainComponent";
import PostVehicleForm from "./PostVehicleForm";
import Navbar from "../Common/Navbar";
import BackToGivenLocation from "../Common/BackToGivenLocation";
import { useLocation } from "react-router-dom";

function UpdateVehiclePage() {
  const { state } = useLocation();
  let vehicleEditDetails = {};
  let isEditing = false;
  let currentSearchQuery;
  if (state && state.isEditing) {
    isEditing = state.isEditing;
    vehicleEditDetails = { ...state.vehicleDetails };
    currentSearchQuery = state.currentSearchQuery;
  }
  return (
    <div>
      <MainComponent>
        <Navbar />
        <div className="max-w-screen-md mx-auto">
          <BackToGivenLocation
            location={`/admin?vehicleName=${currentSearchQuery}`}
          />

          <PostVehicleForm
            vehicleEditDetails={vehicleEditDetails}
            isEditing={isEditing}
            currentSearchQuery={currentSearchQuery}
          />
        </div>
      </MainComponent>
    </div>
  );
}

export default UpdateVehiclePage;
