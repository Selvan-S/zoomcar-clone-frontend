import { useFormik } from "formik";
import React, { useState } from "react";
import { reviewSchema } from "../../schema/schema";
import FullScreenLoading from "../Common/FullScreenLoading";
import { createReview } from "../services/reviewService";
import { useBooking } from "../context/BookingContext";

function ReviewModal({ vehicleId, userId, BookingId, index, bookedVehicles }) {
  const { bookings, setBookings } = useBooking();

  const [isLoading, setIsLoading] = useState(false);
  const [vehicleRating, setVehicleRating] = useState(5);
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        comment: "",
      },
      validationSchema: reviewSchema,
      onSubmit: ({ comment }) => {
        setIsLoading(true);
        createReview({
          comment,
          rating: vehicleRating,
          vehicleId,
          userId,
          BookingId,
        })
          .then((data) => {
            bookings[index] = { ...bookedVehicles, isReviewGiven: true };
            setBookings([...bookings]);
            console.log(bookings);
          })
          .catch((error) => console.error(error))
          .finally(() => {
            document.getElementById("review_close_button").click();
            setIsLoading(false);
          });
      },
    });

  return (
    <div>
      <dialog id="review_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              id="review_close_button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Review</h3>
          <form className="py-4 flex flex-col gap-y-4" onSubmit={handleSubmit}>
            <div className="rating rating-md">
              <input
                type="radio"
                name="vehicle-rating"
                onClick={() => setVehicleRating(1)}
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="vehicle-rating"
                onClick={() => setVehicleRating(2)}
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="vehicle-rating"
                onClick={() => setVehicleRating(3)}
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="vehicle-rating"
                onClick={() => setVehicleRating(4)}
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="vehicle-rating"
                onClick={() => setVehicleRating(5)}
                className="mask mask-star-2 bg-orange-400"
              />
              {touched.rating && errors.rating && (
                <p className="text-center text-red-600 mt-3">{errors.rating}</p>
              )}
            </div>
            <textarea
              className="textarea textarea-bordered"
              name="comment"
              value={values.comment}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="comments..."
            ></textarea>
            {touched.comment && errors.comment && (
              <p className="text-center text-red-600 mt-3">{errors.comment}</p>
            )}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              Submit
            </button>
          </form>
          {isLoading && <FullScreenLoading />}
        </div>
      </dialog>
    </div>
  );
}

export default ReviewModal;
