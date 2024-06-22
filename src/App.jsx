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

function App() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<VehicleList />} />

      <Route
        path="/login"
        element={user ? <Navigate to={"/"} /> : <LoginPage />}
      />

      <Route path="/admin" element={<AdminPage />} />
      <Route
        path="/profile"
        element={user ? <UserProfile /> : <Navigate to={"/login"} />}
      />

      <Route path="/vehicle/details/:id" element={<VehicleDetail />} />
      <Route path="/vehicle/booking/:id" element={<BookingPage />} />
    </Routes>
  );
}

export default App;
