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

// Function to login user
const loginAPI = async (credentials) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_ZOOM_CAR_CLONE_BASE_API_URL}/${
        import.meta.env.VITE_AUTH_BASE_URL
      }/login`,
      {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// Function to register user
const registerAPI = async (credentials) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_ZOOM_CAR_CLONE_BASE_API_URL}/${
        import.meta.env.VITE_AUTH_BASE_URL
      }/register`,
      {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// Function to sent reset link to email
const forgotPasswordAPI = async (email) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_ZOOM_CAR_CLONE_BASE_API_URL}/${
        import.meta.env.VITE_USER_BASE_URL
      }/forgotpassword`,
      {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// Function to update the password
const passwordResetAPI = async (password, resetToken) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_ZOOM_CAR_CLONE_BASE_API_URL}/${
        import.meta.env.VITE_USER_BASE_URL
      }/passwordreset/${resetToken}`,
      {
        method: "PUT",
        body: JSON.stringify({ password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export {
  fetchUserDetails,
  getToken,
  loginAPI,
  registerAPI,
  forgotPasswordAPI,
  passwordResetAPI,
};
