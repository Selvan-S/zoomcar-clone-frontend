const API_URL = import.meta.env.VITE_ZOOM_CAR_CLONE_BASE_API_URL;
const VEHICLES_BASE_URL = import.meta.env.VITE_VEHICLES_BASE_URL;

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
