import React from "react";
import Navbar from "../Components/Common/Navbar";
import MainComponent from "../Components/MainComponent/MainComponent";
import SignupForm from "../Components/User/SignupForm";
import Footer from "../Components/Common/Footer";

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
