import { useSnackbar } from "notistack";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  forgotPasswordAPI,
  loginAPI,
  passwordResetAPI,
  registerAPI,
} from "../services/auth";
import { fetchUserDetails } from "../services/userService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sentMailAlert, setSentMailAlert] = useState(false);
  const [activationMailAlert, SetActivationMailAlert] = useState(false);
  const [error, setError] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const navigateTo = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userDetails = await fetchUserDetails();
        setUser(userDetails);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    // Fetch logged in user when entering the website or page reloads
    fetchUser();
  }, [setUser]);

  // Login user
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);

      const userData = await loginAPI(credentials);
      if (userData?.user) {
        localStorage.setItem("authToken", JSON.stringify(userData.user.token));
      }
      if (userData.error) {
        setError(userData.error);
        enqueueSnackbar(`${userData.error}`, { variant: "error" });
      } else {
        setUser(userData.user);
        enqueueSnackbar("Login successful", { variant: "success" });
      }
    } catch (err) {
      console.error("Login failed:", error);
      setError("Login failed");
      enqueueSnackbar(`Login failed`, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const signup = async (credentials) => {
    try {
      setLoading(true);
      setError(null);

      const userData = await registerAPI(credentials);
      if (userData.error) {
        setError(userData.error);
        enqueueSnackbar(`${userData.error}`, { variant: "error" });
      } else {
        enqueueSnackbar(userData.msg, { variant: "success" });
        SetActivationMailAlert(true);
      }
    } catch (err) {
      console.error("Sign up failed:", error);
      setError("Sign up failed");
      enqueueSnackbar(`Sign up failed`, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Handle forgot password
  const forgotPassword = async (email) => {
    try {
      setSentMailAlert(false);
      setLoading(true);
      setError(null);
      const data = await forgotPasswordAPI(email);
      if (data.error) {
        enqueueSnackbar(`${data.error}`, { variant: "error" });
      } else {
        enqueueSnackbar(`${data.data}`, { variant: "success" });
        setSentMailAlert(true);
      }
    } catch (error) {
      console.error("Failed to send reset link:", error);
      setError("Failed to send reset link");
      enqueueSnackbar(`Failed to send reset link: ${error}`, {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle password reset
  const passwordReset = async (password, resetToken) => {
    try {
      setLoading(true);
      setError(null);
      const data = await passwordResetAPI(password, resetToken);
      if (data.error) {
        setError(data.error);
        enqueueSnackbar(`${data.error}`, { variant: "error" });
      } else {
        enqueueSnackbar(`${data}`, { variant: "success" });
        navigateTo("/login");
      }
    } catch (error) {
      console.error("Failed to reset password:", error);
      setError("Failed to reset password");
      enqueueSnackbar(`Failed to reset password: ${error}`, {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        error,
        setError,
        login,
        logout,
        signup,
        forgotPassword,
        passwordReset,
        sentMailAlert,
        activationMailAlert,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
