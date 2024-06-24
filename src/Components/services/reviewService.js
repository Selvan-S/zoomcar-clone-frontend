const API_URL = import.meta.env.VITE_ZOOM_CAR_CLONE_BASE_API_URL;
const REVIEWS_BASE_URL = import.meta.env.VITE_REVIEWS_BASE_URL;

// Post the review
export async function createReview(vehicle_review) {
  try {
    const response = await fetch(`${API_URL}/${REVIEWS_BASE_URL}`, {
      method: "POST",
      body: JSON.stringify(vehicle_review),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
