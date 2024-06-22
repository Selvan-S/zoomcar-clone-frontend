import React from "react";
import MainComponent from "../Components/MainComponent/MainComponent";
import Navbar from "../Components/Common/Navbar";
import LoginForm from "../Components/User/LoginForm";

function LoginPage() {
  return (
    <div>
      <MainComponent>
        <Navbar />
        <div className="artboard phone-3 mx-auto mt-10">
          <LoginForm />
        </div>
      </MainComponent>
    </div>
  );
}

export default LoginPage;
