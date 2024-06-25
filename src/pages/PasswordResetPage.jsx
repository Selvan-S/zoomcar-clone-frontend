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
        <div className="max-w-screen-sm min-h-[736px] mx-auto my-10 px-4">
          <PasswordResetForm />
        </div>
        <Footer />
      </MainComponent>
    </div>
  );
}

export default PasswordResetPage;
