import React from "react";
import Navbar from "../Components/Common/Navbar";
import MainComponent from "../Components/MainComponent/MainComponent";
import PasswordResetForm from "../Components/User/PasswordResetForm";

function PasswordResetPage() {
  return (
    <div>
      <MainComponent>
        <Navbar />
        <div className="artboard phone-3 mx-auto mt-10">
          <PasswordResetForm />
        </div>
      </MainComponent>
    </div>
  );
}

export default PasswordResetPage;
