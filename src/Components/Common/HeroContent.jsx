import React from "react";
import BackgroundImg from "../../assets/homeBackgroundImg.jpeg";
function HeroContent({ children }) {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${BackgroundImg})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-3xl">
          <h1 className="mb-5 text-5xl font-bold">
            Get 20% off on self-drive car rentals
          </h1>
          <p className="mb-5 text-xl">Book your drive now!</p>
          {children}
        </div>
      </div>
    </div>
  );
}

export default HeroContent;
