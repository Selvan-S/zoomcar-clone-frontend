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
        <div className="max-w-screen-sm min-h-[736px] mx-auto my-10 px-4">
          <SignupForm />
        </div>
        <Footer />
      </MainComponent>
    </div>
  );
}

export default SignupPage;
