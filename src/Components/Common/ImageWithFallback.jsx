import React, { useState } from "react";

const ImageWithFallback = ({
  postImg,
  src,
  fallback,
  alt,
  className,
  makeImageActive,
  removeImage,
  index,
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

      <div className="relative">
        <img
          src={src}
          onClick={makeImageActive}
          alt={alt}
          className={className}
          onLoad={handleImageLoaded}
          onError={handleImageError}
          style={{ display: imageStatus === "loaded" ? "block" : "none" }}
        />
        {postImg && imageStatus === "loaded" && (
          <div
            className="absolute top-0 right-1 cursor-pointer text-red-800"
            onClick={() => removeImage(index)}
          >
            &#128473;
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageWithFallback;
