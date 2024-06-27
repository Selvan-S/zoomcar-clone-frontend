import React from "react";
import ReviewCard from "./ReviewCard";

function Reviews({ currentVehicleDetails }) {
  return (
    <div className="mt-6">
      {!currentVehicleDetails.reviews?.length ? (
        <div className="mx-auto">No reviews</div>
      ) : (
        <div className="grid md:grid-cols-3 grid-cols-1 w-full gap-4">
          {currentVehicleDetails.reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Reviews;
