import React from "react";
import FallbackImg from "../../assets/placeholder.jpeg";
import FullScreenLoading from "../Common/FullScreenLoading";
import ImageWithFallback from "../Common/ImageWithFallback";
import ReviewModal from "../Review/ReviewModal";
import { useBooking } from "../context/BookingContext";
import { updateBookingAPI } from "../services/bookingService";
import { formatDate } from "../../utils/formatDate";

function BookingCard({ bookedVehicles, index }) {
  const { setLoading, loading, bookings, setBookings } = useBooking();

  const isHostCarImagePresent = bookedVehicles.vehicle?.hostCarImage[0]
    ? true
    : false;
  async function handleUpdateBooking(e) {
    setLoading(true);
    try {
      const updatedBooking = await updateBookingAPI({
        status: e.target.value,
        BookingId: bookedVehicles._id,
        vehicleId: bookedVehicles.vehicle._id,
      });
      bookings[index] = { ...bookedVehicles, status: e.target.value };
      setBookings([...bookings]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto">
      <div className="card max-w-96 bg-base-100 shadow-xl">
        <figure>
          <ImageWithFallback
            src={`${
              isHostCarImagePresent
                ? bookedVehicles.vehicle.hostCarImage[0]
                : FallbackImg
            }`}
            fallback={FallbackImg}
            alt={`${bookedVehicles.user.name} booked vehicle`}
            vehicleDetails={false}
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title"> {bookedVehicles.vehicle.name}</h2>
          <p>
            Price :{" "}
            {bookedVehicles.totalPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <p>
            Start Date : {formatDate(bookedVehicles.startDate).substring(0, 12)}
          </p>
          <p>
            End Date : {formatDate(bookedVehicles.endDate).substring(0, 12)}
          </p>
          <p>
            Pickup Time : {formatDate(bookedVehicles.startTime).substring(14)}
          </p>
          <p>
            Dropoff Time : {formatDate(bookedVehicles.endTime).substring(14)}
          </p>

          {/* Display the current payment status */}
          {bookedVehicles.paymentStatus && (
            <div className="card-actions justify-end">
              <div
                className={`${
                  bookedVehicles.paymentStatus == "pending"
                    ? "text-error"
                    : "text-success"
                } badge badge-outline`}
              >
                Payment: {bookedVehicles.paymentStatus}
              </div>
            </div>
          )}
          {/* Display the current status, when the status is changed from "booked" */}
          {bookedVehicles.status != "booked" && (
            <div className="card-actions justify-end">
              <div
                className={`${
                  bookedVehicles.status == "completed"
                    ? "text-success"
                    : "text-error"
                } badge badge-outline`}
              >
                Status: {bookedVehicles.status}
              </div>
            </div>
          )}

          {/* Show Cancel and Completed buttons, only when the status is "booked" */}
          {bookedVehicles.status == "booked" &&
            bookedVehicles.paymentStatus != "pending" && (
              <div className="">
                <div className="flex justify-between card-actions gap-x-2">
                  <button
                    className="btn btn-error"
                    value={"cancelled"}
                    disabled={loading}
                    onClick={handleUpdateBooking}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-success"
                    value={"completed"}
                    disabled={loading}
                    onClick={handleUpdateBooking}
                  >
                    Completed
                  </button>
                </div>
              </div>
            )}

          {/* Show Reivew button, only when status is "booked", and isReviewGiven is false */}
          {bookedVehicles.status != "booked" &&
            !bookedVehicles.isReviewGiven &&
            bookedVehicles.paymentStatus != "pending" && (
              <div className="card-actions justify-start">
                {/* To open review_modal */}
                <button
                  className="btn btn-outline"
                  onClick={() =>
                    document.getElementById("review_modal").showModal()
                  }
                >
                  Review
                </button>
              </div>
            )}
          {loading && <FullScreenLoading />}
          {/* Review modal, user can give ratings and comment */}
          <ReviewModal
            bookedVehicles={bookedVehicles}
            index={index}
            vehicleId={bookedVehicles.vehicle._id}
            userId={bookedVehicles.user._id}
            BookingId={bookedVehicles._id}
          />
        </div>
      </div>
    </div>
  );
}

export default BookingCard;
