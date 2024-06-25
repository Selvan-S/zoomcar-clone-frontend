import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from "react";
import { createBookingAPI } from "../services/bookingService";
import { getToken } from "../Auth/auth";
import { useAuth } from "./AuthContext";

export const BookingContext = createContext();

const BookingProvider = ({ children }) => {
  const { user } = useAuth();
  const API_URL = import.meta.env.VITE_ZOOM_CAR_CLONE_BASE_API_URL;
  const BOOKING_BASE_URL = import.meta.env.VITE_BOOKINGS_BASE_URL;

  const [bookings, setBookings] = useState([]);
  const [protectionPackage, setProtectionPackage] = useState({
    selectedPrice: 359,
  });
  const [pickupDateAndDropOffDate, setPickupDateAndDropOffDate] = useState({
    startDate: new Date().toISOString().substring(0, 10),
    endDate: new Date().toISOString().substring(0, 10),
  });
  const [pickupTimeAndDropoffTime, setPickupTimeAndDropoffTime] = useState({
    pickupTime: "",
    dropoffTime: "",
  });
  const [totalBookedHours, setTotalBookedHours] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user bookings
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${BOOKING_BASE_URL}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const data = await response.json();
      setBookings(data.userBookings);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  // Book a vehicle
  const createBooking = async (details) => {
    try {
      const data = await createBookingAPI(details);
      setBookings(data, ...bookings);
    } catch (error) {
      console.error(error);
    }
  };

  // useMemo to preventing re-rendering
  const value = useMemo(
    () => ({
      bookings,
      setBookings,
      protectionPackage,
      setProtectionPackage,
      createBooking,
      loading,
      setLoading,
      error,
      pickupDateAndDropOffDate,
      setPickupDateAndDropOffDate,
      totalBookedHours,
      setTotalBookedHours,
      pickupTimeAndDropoffTime,
      setPickupTimeAndDropoffTime,
    }),
    [
      protectionPackage,
      bookings,
      loading,
      error,
      pickupDateAndDropOffDate,
      totalBookedHours,
    ]
  );
  return (
    // Context Provider for Booking
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};
export const useBooking = () => useContext(BookingContext);

export default BookingProvider;
