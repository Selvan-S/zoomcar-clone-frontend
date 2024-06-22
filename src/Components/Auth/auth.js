// Function to get the stored token
const getToken = () => {
  const token = localStorage.getItem("authToken");
  return JSON.parse(token);
};

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

export { fetchUserDetails, getToken };
