const API_URL = import.meta.env.VITE_ZOOM_CAR_CLONE_BASE_API_URL;
const BOOKING_BASE_URL = import.meta.env.VITE_BOOKING_BASE_URL;

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

export const updateBookingAPI = async (details) => {
  try {
    const response = await fetch(`${API_URL}/${BOOKING_BASE_URL}`, {
      method: "PUT",
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
