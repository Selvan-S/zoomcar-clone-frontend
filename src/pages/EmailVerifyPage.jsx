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
        <div className="max-w-screen-sm min-h-[736px] mx-auto my-10 px-4">
          <VerifyEmailForm />
        </div>
        <Footer />
      </MainComponent>
    </div>
  );
}

export default EmailVerifyPage;
