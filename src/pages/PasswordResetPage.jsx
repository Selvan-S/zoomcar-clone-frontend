import React from "react";
import Navbar from "../Components/Common/Navbar";
import MainComponent from "../Components/MainComponent/MainComponent";
import PasswordResetForm from "../Components/User/PasswordResetForm";
import Footer from "../Components/Common/Footer";

function PasswordResetPage() {
  return (
    <div>
      <MainComponent>
        <Navbar />
        <div className="artboard phone-3 mx-auto mt-10">
          <PasswordResetForm />
        </div>
        <Footer />
      </MainComponent>
    </div>
  );
}

export default PasswordResetPage;
