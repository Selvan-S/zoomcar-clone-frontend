import { enqueueSnackbar } from "notistack";
import React, { createContext, useEffect, useState } from "react";
import { fetchVehiclesAPI, postVehicleAPI } from "../services/vehicleService";

export const VehicleContext = createContext();

const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: 0,
    maxPrice: 1000,
  });
  const [currentSearchLocation, setCurrentSearchLocation] = useState("");
  const [currentVehicleDetails, setCurrentVehicleDetails] = useState({
    _id: "",
    name: "",
    hostCarImage: [],
    carType: "",
    fuelType: "",
    transmission: "",
    seats: 0,
    availability: false,
    pricePerHour: 0,
    reviews: [],
    createdAt: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch vehicles by applied fileters
  const fetchVehicles = async () => {
    try {
      setIsLoading(true);
      const data = await fetchVehiclesAPI(filters);
      setVehicles(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [filters]);

  // Create a Vehicle (Admin)
  const createVehicle = async (vehicleDetails) => {
    try {
      setIsLoading(true);
      const data = await postVehicleAPI(vehicleDetails);
      setVehicles([data, ...vehicles]);
      enqueueSnackbar("Vehicle created successfully", { variant: "success" });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VehicleContext.Provider
      value={{
        vehicles,
        filters,
        setFilters,
        setCurrentSearchLocation,
        currentSearchLocation,
        currentVehicleDetails,
        setCurrentVehicleDetails,
        isLoading,
        createVehicle,
        setIsLoading,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};

export default VehicleProvider;
