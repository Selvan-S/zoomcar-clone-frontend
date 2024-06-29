import { getToken } from "./auth";

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

// Post vehicle (admin)
export const postVehicleAPI = async (vehicleDetails) => {
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

// update vehicle (admin)
export const updateVehicleAPI = async (vehicleDetails, vehicleId) => {
  try {
    const response = await fetch(
      `${API_URL}/${VEHICLES_BASE_URL}/${vehicleId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },

        body: JSON.stringify(vehicleDetails),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Fetch all vehicles (Admin)
export const fetchAllVehiclesAPI = async (filters) => {
  try {
    const response = await fetch(
      `${API_URL}/${VEHICLES_BASE_URL}/getAllVehicles?vehicleName=${filters}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Fetch unapproved vehicles (Admin)
export const fetchUnapprovedVehiclesAPI = async () => {
  try {
    const response = await fetch(
      `${API_URL}/${VEHICLES_BASE_URL}/getUnapprovedVehicles`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
// Delete vehicles (Admin)
export const deleteVehiclesAPI = async (vehicleId) => {
  try {
    const response = await fetch(
      `${API_URL}/${VEHICLES_BASE_URL}/${vehicleId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
