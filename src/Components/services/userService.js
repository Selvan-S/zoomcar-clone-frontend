import { getToken } from "../Auth/auth";

// Function to fetch user details
const fetchUserDetails = async () => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }
  try {
    const response = await fetch(
      `${import.meta.env.VITE_ZOOM_CAR_CLONE_BASE_API_URL}/${
        import.meta.env.VITE_AUTH_BASE_URL
      }/me`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const userData = await response.json();
    return userData;
  } catch (error) {
    throw new Error("Failed to fetch user details");
  }
};

const updateUserAPI = async (userAvatarLink) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_ZOOM_CAR_CLONE_BASE_API_URL}/${
        import.meta.env.VITE_USER_BASE_URL
      }/update`,
      {
        method: "PUT",
        body: JSON.stringify({
          userAvatarLink, // The URL of the uploaded image
        }),
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("authToken")
          )}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to update user details");
  }
};

export { fetchUserDetails, updateUserAPI };
