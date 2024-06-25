import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import VehicleList from "./pages/VehicleList.js.jsx";
import PageNotFound from "./Components/Common/PageNotFound.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { useAuth } from "./Components/context/AuthContext.jsx";
import UserProfile from "./Components/User/UserProfile.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import VehicleDetail from "./pages/VehicleDetail.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import UserBookings from "./pages/UserBookings.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import EmailVerifyPage from "./pages/EmailVerifyPage.jsx";
import PasswordResetPage from "./pages/PasswordResetPage.jsx";

function App() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      {/* Admin page to post vehicle */}
      <Route
        path="/admin"
        element={
          user && user?.role == "admin" ? <AdminPage /> : <Navigate to={"/"} />
        }
      />
      {/* Home page */}
      <Route path="/" element={<HomePage />} />

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
