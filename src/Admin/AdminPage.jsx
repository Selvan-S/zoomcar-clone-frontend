import React from "react";
import MainComponent from "../Components/MainComponent/MainComponent";
import Navbar from "../Components/Common/Navbar";
import PostVehicleForm from "../Components/Vehicle/PostVehicleForm";

function AdminPage() {
  return (
    <div>
      <MainComponent>
        <Navbar />
        <div className="artboard phone-3 mx-auto mt-10">
          <PostVehicleForm />
        </div>
      </MainComponent>
    </div>
  );
}

export default AdminPage;
