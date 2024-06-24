import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import VehicleList from "./Components/Vehicle/VehicleList.js";
import PageNotFound from "./Components/Common/PageNotFound.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { useAuth } from "./Components/context/AuthContext.jsx";
import UserProfile from "./Components/User/UserProfile.jsx";
import AdminPage from "./Admin/AdminPage.jsx";
import VehicleDetail from "./Components/Vehicle/VehicleDetail.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import UserBookings from "./Components/Booking/UserBookings.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import EmailVerifyPage from "./pages/EmailVerifyPage.jsx";
import PasswordResetPage from "./pages/PasswordResetPage.jsx";

function App() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route
        path="/admin"
        element={
          user && user?.role == "admin" ? <AdminPage /> : <Navigate to={"/"} />
        }
      />
      {/* Home page */}
      <Route path="/" element={<HomePage />} />
      {/* Login page */}
      <Route
        path="/login"
        element={user ? <Navigate to={"/"} /> : <LoginPage />}
      />
      <Route
        path="/signup"
        element={user ? <Navigate to={"/"} /> : <SignupPage />}
      />
      <Route
        path="/verifyEmail"
        element={user ? <Navigate to={"/"} /> : <EmailVerifyPage />}
      />
      <Route
        path="/passwordreset/:resetToken"
        element={user ? <Navigate to={"/"} /> : <PasswordResetPage />}
      />

      {/* User profile page. user can upload display picture here. */}
      <Route
        path="/profile"
        element={user ? <UserProfile /> : <Navigate to={"/login"} />}
      />
      {/* User Bookings, and can add review here. Found on Navbar profile dropdown*/}
      <Route
        path="/user/bookings"
        element={user ? <UserBookings /> : <Navigate to={"/login"} />}
      />

      {/* Filter the vehicles */}
      <Route path="/search" element={<VehicleList />} />
      {/* Specific vehicle details page, can confirm booking here. */}
      <Route path="/vehicle/details/:id" element={<VehicleDetail />} />
      {/* Checkout the vehicle*/}
      <Route path="/vehicle/booking/:id" element={<BookingPage />} />

    </Routes>
  );
}

export default App;
