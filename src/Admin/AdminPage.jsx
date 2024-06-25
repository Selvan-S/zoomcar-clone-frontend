import React from "react";
import MainComponent from "../Components/MainComponent/MainComponent";
import Navbar from "../Components/Common/Navbar";
import PostVehicleForm from "../Components/Vehicle/PostVehicleForm";
import Footer from "../Components/Common/Footer";

function AdminPage() {
  return (
    <div>
      <MainComponent>
        <Navbar />
        <div className="max-w-screen-sm mx-auto my-10 px-4">
          <PostVehicleForm />
        </div>
        <Footer />
      </MainComponent>
    </div>
  );
}

export default AdminPage;
