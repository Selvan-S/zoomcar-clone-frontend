import React from "react";
import MainComponent from "../Components/MainComponent/MainComponent";
import Navbar from "../Components/Common/Navbar";
import LoginForm from "../Components/User/LoginForm";
import { useAuth } from "../Components/context/AuthContext";
import FullScreenLoading from "../Components/Common/FullScreenLoading";
import Footer from "../Components/Common/Footer";

function LoginPage() {
  const { loading } = useAuth();

  return (
    <div>
      <MainComponent>
        <Navbar />
        <div className="max-w-screen-sm min-h-[736px] mx-auto my-10 px-4">
          <LoginForm />
        </div>
        {loading && <FullScreenLoading />}
        <Footer />
      </MainComponent>
    </div>
  );
}

export default LoginPage;
