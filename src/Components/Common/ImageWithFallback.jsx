import React, { useState } from "react";

const ImageWithFallback = ({
  src,
  fallback,
  alt,
  className,
  vehicleDetails,
  makeImageActive,
}) => {
  const [imageStatus, setImageStatus] = useState("loading");

  const handleImageLoaded = () => {
    setImageStatus("loaded");
  };

  const handleImageError = () => {
    setImageStatus("error");
  };

  return (
    <div className={`w-full`}>
      {imageStatus === "loading" && (
        <div className="skeleton w-full h-full"></div>
      )}
      {imageStatus === "error" && (
        <img src={fallback} alt="Fallback" className={className} />
      )}
      {vehicleDetails ? (
        <img
          src={src}
          onClick={makeImageActive}
          alt={alt}
          className={className}
          onLoad={handleImageLoaded}
          onError={handleImageError}
          style={{ display: imageStatus === "loaded" ? "block" : "none" }}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          className="image-main"
          onLoad={handleImageLoaded}
          onError={handleImageError}
          style={{ display: imageStatus === "loaded" ? "block" : "none" }}
        />
      )}
    </div>
  );
};

export default ImageWithFallback;
