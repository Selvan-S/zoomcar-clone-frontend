import React from "react";
import Footer from "../Components/Common/Footer";
import Navbar from "../Components/Common/Navbar";
import MainComponent from "../Components/MainComponent/MainComponent";
import SignupForm from "../Components/User/SignupForm";

function SignupPage() {
  return (
    <div>
      <MainComponent>
        <Navbar />
        <div className="artboard phone-3 mx-auto mt-10">
          <SignupForm />
        </div>
        <Footer />
      </MainComponent>
    </div>
  );
}

export default SignupPage;
