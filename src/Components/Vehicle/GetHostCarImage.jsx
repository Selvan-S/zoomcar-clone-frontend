import React from "react";
import ImageWithFallback from "../Common/ImageWithFallback";
import vehicleFallbackImg from "../../assets/placeholder.jpeg";

function GetHostCarImage({ image, index, length, vehicleId }) {
  const imgId = Math.min(index + 1, length);
  const forward = ((index + 1) % length) + 1;
  const previous = index === 0 ? length : index;

  return (
    <div id={`${vehicleId}${imgId}`} className="carousel-item relative w-full">
      <ImageWithFallback
        src={`${image}`}
        fallback={vehicleFallbackImg}
        alt={`hostCarImage`}
        className="custom-image"
      />
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a
          href={`#${vehicleId}${previous}`}
          className="btn btn-circle max-md:text-xs"
        >
          ❮
        </a>
        <a href={`#${vehicleId}${forward}`} className="btn btn-circle">
          ❯
        </a>
      </div>
    </div>
  );
}

export default GetHostCarImage;
