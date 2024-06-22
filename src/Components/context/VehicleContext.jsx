import React, { createContext, useState, useEffect } from "react";
import { fetchVehiclesAPI } from "../services/vehicleService";

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
    createdAt: "",
  });
  const fetchVehicles = async () => {
    try {
      const data = await fetchVehiclesAPI(filters);
      setVehicles(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [filters]);

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
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};

export default VehicleProvider;
