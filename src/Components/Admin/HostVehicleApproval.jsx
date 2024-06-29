import React, { useEffect, useState } from "react";
import FullScreenLoading from "../Common/FullScreenLoading";
import { fetchUnapprovedVehiclesAPI } from "../services/vehicleService";
import { enqueueSnackbar } from "notistack";
import ConfirmApproveModel from "../Common/ConfirmApproveModel";
import ConfirmRejectModal from "../Common/ConfirmRejectModal";

function HostVehicleApproval() {
  const [unapprovedVehicles, setUnapprovedVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  async function getUnapprovedVehicles() {
    setIsLoading(true);
    const vehiclesData = await fetchUnapprovedVehiclesAPI();
    if (vehiclesData.error) {
      enqueueSnackbar(vehiclesData.error, { variant: "error" });
      setIsLoading(false);
      return;
    }
    setUnapprovedVehicles(vehiclesData.vehicles);
    setIsLoading(false);
  }

  useEffect(() => {
    getUnapprovedVehicles();
  }, []);
  return (
    <div>
      <div className="overflow-x-auto max-w-full max-h-full">
        <div className="flex justify-center items-baseline max-sm:flex-wrap">
          <span className="text-2xl">Approve Vehicles</span>
        </div>
        <table className="table table-sm table-pin-rows z-0 mt-8">
          <thead>
            <tr>
              <th></th>
              <td>Name</td>
              <td>hostCarImage</td>
              <td>carType</td>
              <td>fuelType</td>
              <td>transmission</td>
              <td>seats</td>
              <td>pricePerHour</td>
              <td>createdAt</td>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {!unapprovedVehicles?.length ? (
              <tr>
                <th colSpan={10} className="text-center">
                  No Records Found
                </th>
              </tr>
            ) : (
              unapprovedVehicles.map((vehicle, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{vehicle.name}</td>
                  <td>
                    {!vehicle.hostCarImage.length
                      ? "No host image"
                      : vehicle.hostCarImage.join(" || ")}
                  </td>
                  <td>{vehicle.carType}</td>
                  <td>{vehicle.fuelType}</td>
                  <td>{vehicle.transmission}</td>
                  <td>{vehicle.seats} Seats</td>
                  <th>{vehicle.pricePerHour}</th>
                  <th>{new Date(vehicle.createdAt).toLocaleString()}</th>
                  <th className="flex justify-center gap-2">
                    <button
                      className="btn btn-outline btn-success btn-circle min-w-20"
                      onClick={() =>
                        document
                          .getElementById(`open_approve_modal_${index}`)
                          .showModal()
                      }
                    >
                      Aprove
                    </button>
                    <button
                      className="btn btn-outline btn-error btn-circle min-w-20"
                      onClick={() =>
                        document
                          .getElementById(`open_reject_modal_${index}`)
                          .showModal()
                      }
                    >
                      Reject
                    </button>
                  </th>
                  <ConfirmApproveModel
                    unapprovedVehicles={unapprovedVehicles}
                    setUnapprovedVehicles={setUnapprovedVehicles}
                    index={index}
                    vehicleId={vehicle._id}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                  <ConfirmRejectModal
                    unapprovedVehicles={unapprovedVehicles}
                    setUnapprovedVehicles={setUnapprovedVehicles}
                    index={index}
                    vehicleId={vehicle._id}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                </tr>
              ))
            )}
          </tbody>
        </table>
        {isLoading && <FullScreenLoading />}
      </div>
    </div>
  );
}

export default HostVehicleApproval;
