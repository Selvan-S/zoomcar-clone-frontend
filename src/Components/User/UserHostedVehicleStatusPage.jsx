import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";
import MainComponent from "../MainComponent/MainComponent";
import { fetchHostVehiclesStatusAPI } from "../services/userService";
import FullScreenLoading from "../Common/FullScreenLoading";

function UserHostedVehicleStatusPage() {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  async function getHostedVehiclesStatus() {
    setIsLoading(true);
    const vehiclesData = await fetchHostVehiclesStatusAPI();
    if (vehiclesData.error) {
      enqueueSnackbar(vehiclesData.error, { variant: "error" });
      setIsLoading(false);
      return;
    }
    setVehicles(vehiclesData.vehicles);
    setIsLoading(false);
  }

  useEffect(() => {
    getHostedVehiclesStatus();
  }, []);
  return (
    <MainComponent>
      <Navbar />
      <div className="max-w-screen-lg mx-auto h-screen overflow-auto mt-10">
        <div className="overflow-x-auto max-w-full max-h-full">
          <div className="flex justify-center items-baseline max-sm:flex-wrap">
            <span className="text-2xl">Hosted Vehicle Status</span>
          </div>
          <table className="table table-sm table-pin-rows z-0 mt-4">
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
                <td>hostCarStatus</td>
                <td>createdAt</td>
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
                    <th>
                      {vehicle.availability ? "Available" : "Not Available"}
                    </th>
                    <th>{vehicle.pricePerHour}</th>
                    <th
                      className={`${
                        vehicle.hostCarStatus == "approved" && "text-success"
                      } ${
                        vehicle.hostCarStatus == "rejected" && "text-error"
                      } text-primary`}
                    >
                      {vehicle.hostCarStatus}
                    </th>
                    <th>{new Date(vehicle.createdAt).toLocaleString()}</th>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {isLoading && <FullScreenLoading />}
        </div>
      </div>

      <Footer />
    </MainComponent>
  );
}

export default UserHostedVehicleStatusPage;
