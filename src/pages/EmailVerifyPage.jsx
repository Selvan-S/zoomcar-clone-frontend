import React from "react";
import Navbar from "../Components/Common/Navbar";
import MainComponent from "../Components/MainComponent/MainComponent";
import VerifyEmailForm from "../Components/User/VerifyEmailForm";
import Footer from "../Components/Common/Footer";

function EmailVerifyPage() {
  return (
    <div>
      <MainComponent>
        <Navbar />
        <div className="artboard phone-3 mx-auto mt-10">
          <VerifyEmailForm />
        </div>
        <Footer />
      </MainComponent>
    </div>
  );
}

export default EmailVerifyPage;
