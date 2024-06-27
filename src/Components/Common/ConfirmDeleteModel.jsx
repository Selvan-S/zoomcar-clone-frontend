import React from "react";
import { deleteVehiclesAPI } from "../services/vehicleService";
import { enqueueSnackbar } from "notistack";

function ConfirmDeleteModel({
  isLoading,
  setIsLoading,
  vehicles,
  setVehicles,
  vehicleId,
  index,
}) {
  async function handleConfirmDelete() {
    try {
      setIsLoading(true);
      const data = await deleteVehiclesAPI(vehicleId);
      if (data.error) {
        enqueueSnackbar(data.error, { variant: "error" });
        return;
      }
      const filterVehicle = vehicles.filter(
        (vehicle) => vehicle._id == vehicleId
      );
      setVehicles({ filterVehicle });
      enqueueSnackbar(data.msg, { variant: "success" });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div>
      <dialog id={`open_delete_modal_${index}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              id={`close_button_${index}`}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-xl"
              disabled={isLoading}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-center">
            Kindly confirm your request to delete the vehicle.
          </h3>
          <div className="flex justify-center gap-x-10 mt-8">
            <button
              className="btn btn-primary btn-outline max-sm:min-w-20 min-w-40"
              onClick={() =>
                document.getElementById(`close_button_${index}`).click()
              }
              disabled={isLoading}
            >
              Close
            </button>
            <button
              className="btn btn-error btn-outline max-sm:min-w-20 min-w-40"
              onClick={handleConfirmDelete}
              disabled={isLoading}
            >
              Confirm
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default ConfirmDeleteModel;
