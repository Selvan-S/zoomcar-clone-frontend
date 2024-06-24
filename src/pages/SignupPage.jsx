import React from "react";
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
      </MainComponent>
    </div>
  );
}

export default SignupPage;
