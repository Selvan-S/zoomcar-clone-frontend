import { enqueueSnackbar } from "notistack";
import React from "react";
import { updateVehicleAPI } from "../services/vehicleService";

function ConfirmApproveModel({
  isLoading,
  setIsLoading,
  unapprovedVehicles,
  setUnapprovedVehicles,
  vehicleId,
  index,
}) {
  async function handleConfirmApprove() {
    try {
      setIsLoading(true);
      const data = await updateVehicleAPI(
        { hostCarStatus: "approved" },
        vehicleId
      );
      if (data.error) {
        enqueueSnackbar(data.error, { variant: "error" });
        return;
      }
      const filterVehicle = unapprovedVehicles.filter(
        (vehicle) => vehicle._id != vehicleId
      );
      setUnapprovedVehicles(filterVehicle);
      enqueueSnackbar(data.msg, { variant: "success" });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div>
      <dialog id={`open_approve_modal_${index}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              id={`approve_close_button_${index}`}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-xl"
              disabled={isLoading}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-center">
            Kindly confirm your request to approve the vehicle.
          </h3>
          <div className="flex justify-center gap-x-10 mt-8">
            <button
              className="btn btn-primary btn-outline max-sm:min-w-20 min-w-40"
              onClick={() =>
                document.getElementById(`approve_close_button_${index}`).click()
              }
              disabled={isLoading}
            >
              Close
            </button>
            <button
              className="btn btn-success btn-outline max-sm:min-w-20 min-w-40"
              onClick={() => {
                handleConfirmApprove();
                document
                  .getElementById(`approve_close_button_${index}`)
                  .click();
              }}
              disabled={isLoading}
            >
              Approve
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default ConfirmApproveModel;
