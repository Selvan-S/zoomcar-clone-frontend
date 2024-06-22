import React from "react";
import MainComponent from "../Components/MainComponent/MainComponent";
import HeroContent from "../Components/Common/HeroContent";
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";
import VehicleFilter from "../Components/Vehicle/VehicleFilter";

function HomePage() {
  return (
    <div>
      <MainComponent>
        <Navbar></Navbar>
        <HeroContent>
          <VehicleFilter />
        </HeroContent>
        <Footer />
      </MainComponent>
    </div>
  );
}

export default HomePage;
