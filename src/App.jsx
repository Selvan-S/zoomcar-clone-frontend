import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import UpdateVehiclePage from "./Components/Admin/UpdateVehiclePage.jsx";
import PageNotFound from "./Components/Common/PageNotFound.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import { useAuth } from "./Components/context/AuthContext.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import EmailVerifyPage from "./pages/EmailVerifyPage.jsx";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage.jsx";
import PasswordResetPage from "./pages/PasswordResetPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import UserBookings from "./pages/UserBookings.jsx";
import VehicleDetail from "./pages/VehicleDetail.jsx";
import VehicleList from "./pages/VehicleList.js.jsx";
import UserHostVehiclePage from "./pages/UserHostVehiclePage.jsx";
import UserHostedVehicleStatusPage from "./Components/User/UserHostedVehicleStatusPage.jsx";

function App() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      {/* Admin page for post, edit, view and update vehicles  */}
      <Route
        path="/admin"
        element={
          user && user?.role == "admin" ? <AdminPage /> : <Navigate to={"/"} />
        }
      />
      {/* Edit vehicle */}
      <Route
        path="/admin/vehicle/edit"
        element={
          user && user?.role == "admin" ? (
            <UpdateVehiclePage />
          ) : (
            <Navigate to={"/"} />
          )
        }
      />

      {/* Home page */}
      <Route
        path="/"
        element={user && user?.role == "admin" ? <AdminPage /> : <HomePage />}
      />

      {/* --- Authentication --- */}
      {/* Login page */}
      <Route
        path="/login"
        element={user ? <Navigate to={"/"} /> : <LoginPage />}
      />
      {/* Signup page */}
      <Route
        path="/signup"
        element={user ? <Navigate to={"/"} /> : <SignupPage />}
      />
      {/* Email verification page, to sent password resent link  */}
      <Route
        path="/verifyEmail"
        element={user ? <Navigate to={"/"} /> : <EmailVerifyPage />}
      />
      {/* Reset password page */}
      <Route
        path="/passwordreset/:resetToken"
        element={user ? <Navigate to={"/"} /> : <PasswordResetPage />}
      />

      {/* --- User --- */}
      {/* User profile page. user can upload display picture here. */}
      <Route
        path="/profile"
        element={user ? <UserProfile /> : <Navigate to={"/login"} />}
      />
      {/* User Bookings, and can add review here. Found on Navbar profile dropdown*/}
      <Route path="/user/bookings" element={<UserBookings />} />
      {/* User can host there vehicle*/}
      <Route
        path="/user/hostVehicle"
        element={user ? <UserHostVehiclePage /> : <Navigate to={"/login"} />}
      />
      {/* User Hosted Vehicle Status Page*/}
      <Route
        path="/user/hostedVehicleStatus"
        element={
          user ? <UserHostedVehicleStatusPage /> : <Navigate to={"/login"} />
        }
      />

      {/* --- Vehicle --- */}
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
