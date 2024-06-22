import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import VehicleProvider from "./Components/context/VehicleContext.jsx";
import { AuthProvider } from "./Components/context/AuthContext.jsx";
import BookingProvider from "./Components/context/BookingContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <BookingProvider>
        <VehicleProvider>
          <App />
        </VehicleProvider>
      </BookingProvider>
    </AuthProvider>
  </BrowserRouter>
);
