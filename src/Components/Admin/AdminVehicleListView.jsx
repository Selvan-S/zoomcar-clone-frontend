import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SearchButton from "../../utils/SearchButton";
import ConfirmDeleteModel from "../Common/ConfirmDeleteModel";
import FullScreenLoading from "../Common/FullScreenLoading";
import { fetchAllVehiclesAPI } from "../services/vehicleService";

function AdminVehicleListView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vehicles, setVehicles] = useState([]);
  const vehicleName = searchParams.get("vehicleName");
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  async function getVehicles(vehicleName) {
    setIsLoading(true);
    const vehiclesData = await fetchAllVehiclesAPI(vehicleName);
    if (vehiclesData.error) {
      enqueueSnackbar(vehiclesData.error, { variant: "error" });
      setIsLoading(false);
      return;
    }
    setVehicles(vehiclesData.vehicles);
    setIsLoading(false);
  }

  useEffect(() => {
    getVehicles(vehicleName || "");
  }, [searchParams]);

  return (
    <div>
      <div className="overflow-x-auto max-w-full max-h-full">
        <div className="flex justify-between items-baseline max-sm:flex-wrap">
          <span className="text-2xl">Vehicle List</span>
          <div className="flex justify-end my-10">
            <SearchButton
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          </div>
        </div>
        <table className="table table-sm table-pin-rows z-0">
          <thead>
            <tr>
              <th></th>
              <td>Name</td>
              <td>hostCarImage</td>
              <td>carType</td>
              <td>fuelType</td>
              <td>transmission</td>
              <td>seats</td>
              <td>availability</td>
              <td>pricePerHour</td>
              <td>createdAt</td>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {!vehicles?.length ? (
              <tr>
                <th colSpan={11} className="text-center">
                  No Records Found
                </th>
              </tr>
            ) : (
              vehicles.map((vehicle, index) => (
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
                  <th>{JSON.stringify(vehicle.availability)}</th>
                  <th>{vehicle.pricePerHour}</th>
                  <th>{new Date(vehicle.createdAt).toLocaleString()}</th>
                  <th className="flex justify-center gap-2">
                    <Link
                      state={{
                        isEditing: true,
                        vehicleDetails: vehicle,
                        currentSearchQuery: searchValue,
                      }}
                      to={"/admin/vehicle/edit"}
                    >
                      <button className="btn btn-circle min-w-20">Edit</button>
                    </Link>
                    <button
                      className="btn btn-circle min-w-20"
                      onClick={() =>
                        document
                          .getElementById(`open_delete_modal_${index}`)
                          .showModal()
                      }
                    >
                      Delete
                    </button>
                  </th>
                  <ConfirmDeleteModel
                    vehicles={vehicles}
                    setVehicles={setVehicles}
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

export default AdminVehicleListView;
