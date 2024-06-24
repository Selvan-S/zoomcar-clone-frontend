import React from "react";
import MainComponent from "../Components/MainComponent/MainComponent";
import Navbar from "../Components/Common/Navbar";
import LoginForm from "../Components/User/LoginForm";
import { useAuth } from "../Components/context/AuthContext";
import FullScreenLoading from "../Components/Common/FullScreenLoading";

function LoginPage() {
  const { loading } = useAuth();

  return (
    <div>
      <MainComponent>
        <Navbar />
        <div className="artboard phone-3 mx-auto mt-10">
          <LoginForm />
        </div>
        {loading && <FullScreenLoading />}
      </MainComponent>
    </div>
  );
}

export default LoginPage;
