import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchUserDetails } from "../Auth/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDetails = await fetchUserDetails();
        setUser(userDetails);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setUser]);

  const login = async (credentials) => {
    try {
      setError(null);
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
      // check this ---------------
      // const data = await response;
      const userData = await response.json();
      if (userData?.user) {
        localStorage.setItem("authToken", JSON.stringify(userData.user.token));
      }
      if (userData.error) {
        setError(userData.error);
      } else setUser(userData.user);
    } catch (err) {
      console.error("Login failed:", error);
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, error, setError, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
