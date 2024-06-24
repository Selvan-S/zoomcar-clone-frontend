import { getToken } from "../Auth/auth";

const API_URL = import.meta.env.VITE_ZOOM_CAR_CLONE_BASE_API_URL;
const BOOKING_BASE_URL = import.meta.env.VITE_BOOKINGS_BASE_URL;

// API to Book a vehicle
export const createBookingAPI = async (details) => {
  try {
    const response = await fetch(`${API_URL}/${BOOKING_BASE_URL}`, {
      method: "POST",
      body: JSON.stringify(details),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// API for Update booking ie. make booked vehicle "compeleted" or "cancelled"
export const updateBookingAPI = async (details) => {
  try {
    const response = await fetch(`${API_URL}/${BOOKING_BASE_URL}`, {
      method: "PUT",
      body: JSON.stringify(details),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
