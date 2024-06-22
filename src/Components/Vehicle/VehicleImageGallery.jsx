import React from "react";
import ImageWithFallback from "../Common/ImageWithFallback";

function VehicleImageGallery({ hostCarImage }) {
  const [active, setActive] = React.useState(
    hostCarImage.length > 0
      ? hostCarImage[0]
      : "\\src\\assets\\placeholder.jpeg"
  );
  return (
    <div className="flex md:flex-row max-md:flex-col gap-4 h-full image-gallery ">
      <div>
        <ImageWithFallback
          vehicleDetails={true}
          src={active}
          fallback="\src\assets\placeholder.jpeg"
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
                vehicleDetails={true}
                src={imgelink}
                fallback="\src\assets\placeholder.jpeg"
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
