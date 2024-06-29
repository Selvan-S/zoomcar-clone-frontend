import React from "react";
import MainComponent from "../Components/MainComponent/MainComponent";
import Navbar from "../Components/Common/Navbar";
import PostVehicleForm from "../Components/Admin/PostVehicleForm";
import Footer from "../Components/Common/Footer";

function UserHostVehiclePage() {
  return (
    <div>
      <MainComponent>
        <Navbar />
        <div className="max-w-screen-sm min-h-[736px] mx-auto my-10 px-4">
          <PostVehicleForm />
        </div>
        <Footer />
      </MainComponent>
    </div>
  );
}

export default UserHostVehiclePage;
