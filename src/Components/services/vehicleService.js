import { getToken } from "../Auth/auth";

const API_URL = import.meta.env.VITE_ZOOM_CAR_CLONE_BASE_API_URL;
const VEHICLES_BASE_URL = import.meta.env.VITE_VEHICLES_BASE_URL;

// Get filtered Vehicles
export const fetchVehiclesAPI = async (filters) => {
  const { category, minPrice, maxPrice } = filters;
  try {
    const response = await fetch(
      `${API_URL}/${VEHICLES_BASE_URL}?carType=${category}&gte=${minPrice}&lte=${maxPrice}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Get specific vehicle
export const fetchVehiclesById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${VEHICLES_BASE_URL}/${id}`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Post vehicle
export const PostVehicleAPI = async (vehicleDetails) => {
  try {
    const response = await fetch(`${API_URL}/${VEHICLES_BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },

      body: JSON.stringify(vehicleDetails),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
