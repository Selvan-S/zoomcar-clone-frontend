import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from "react";
import { createBookingAPI } from "../services/bookingService";
import { getToken } from "../Auth/auth";

export const BookingContext = createContext();
const BookingProvider = ({ children }) => {
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

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${BOOKING_BASE_URL}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setBookings(response.userBookings);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const createBooking = async (details) => {
    try {
      const data = await createBookingAPI(details);
      setBookings(data, ...bookings);
    } catch (error) {
      console.error(error);
    }
  };
  const value = useMemo(
    () => ({
      protectionPackage,
      setProtectionPackage,
      createBooking,
      loading,
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
      loading,
      error,
      pickupDateAndDropOffDate,
      totalBookedHours,
    ]
  );
  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};
export const useBooking = () => useContext(BookingContext);

export default BookingProvider;
