import React, { useEffect, useState } from "react";
import ImageWithFallback from "../Common/ImageWithFallback";
import vehicleFallBack from "../../assets/placeholder.jpeg";

function VehicleImageGallery({ hostCarImage }) {
  const [active, setActive] = useState(hostCarImage[0]);
  useEffect(() => {
    setActive(() => (!hostCarImage[0] ? vehicleFallBack : hostCarImage[0]));
  }, [hostCarImage]);
  return (
    <div className="flex md:flex-row max-md:flex-col gap-4 h-full image-gallery ">
      <div>
        <ImageWithFallback
          src={active}
          fallback={vehicleFallBack}
          alt={`gallery-image`}
          className="h-auto w-full rounded-lg object-cover object-center md:h-[480px]"
        />
      </div>
      {hostCarImage.length > 0 && (
        <div className="grid max-sm:grid-cols-3 max-sm:gap-2 gap-4 place-items-center max-md:grid-rows-1 max-md:grid-cols-3 md:grid-rows-5 md:grid-cols-1">
          {hostCarImage.map((imgelink, index) => (
            <div key={index}>
              <ImageWithFallback
                makeImageActive={() => setActive(imgelink)}
                src={imgelink}
                fallback={vehicleFallBack}
                alt={`gallery-image`}
                className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VehicleImageGallery;
