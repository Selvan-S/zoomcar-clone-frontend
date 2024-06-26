import moment from "moment";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import React, { useEffect, useState } from "react";
import DatePicker from "react-tailwindcss-datepicker";
import { useBooking } from "../context/BookingContext";

const TimeRangeSlider = () => {
  const [isActive, setIsActive] = useState(false);
  const {
    setPickupDateAndDropOffDate,
    pickupDateAndDropOffDate,
    setTotalBookedHours,
    setPickupTimeAndDropoffTime,
  } = useBooking();
  const MINUTES_IN_HOUR = 60;
  const MINUTES_IN_DAY = 24 * MINUTES_IN_HOUR;
  const MIN_TIME_DIFF = 4 * MINUTES_IN_HOUR; // 4 hours in minutes

  const MIN_TIME = 0; // 0 minutes (12 AM)
  const MAX_TIME = 24 * MINUTES_IN_HOUR; // 1440 minutes (12 AM next day)

  const now = moment();
  const currentMinutes = now.hours() * MINUTES_IN_HOUR + now.minutes();

  const today = now.startOf("day").toDate();

  const [dateRange, setDateRange] = useState({
    startDate: today,
    endDate: today,
  });
  const [pickupTime, setPickupTime] = useState(
    Math.max(currentMinutes, 12 * MINUTES_IN_HOUR)
  ); // Initial pickup time should be at least the current time or 12:00 PM
  const [dropoffTime, setDropoffTime] = useState(
    Math.max(currentMinutes + MIN_TIME_DIFF, 16 * MINUTES_IN_HOUR)
  ); // 4:00 PM or 4 hours after current time

  const formatTime = (minutes) => {
    const time = moment().startOf("day").add(minutes, "minutes");
    return time.format("hh:mm A");
  };

  const handlePickupChange = (newTime) => {
    const isToday = moment(dateRange.startDate).isSame(moment(), "day");
    const newPickupTime = isToday ? Math.max(newTime, currentMinutes) : newTime;
    const newDropoffTime = Math.max(newPickupTime + MIN_TIME_DIFF, dropoffTime);

    setPickupTime(newPickupTime);
    setDropoffTime(newDropoffTime);

    if (newPickupTime >= MAX_TIME) {
      setDateRange({
        startDate: moment(dateRange.startDate).add(1, "days").toDate(),
        endDate: moment(dateRange.endDate).isAfter(dateRange.startDate, "day")
          ? dateRange.endDate
          : moment(dateRange.startDate).add(1, "days").toDate(),
      });
    } else if (newDropoffTime >= MAX_TIME) {
      setDateRange({
        startDate: dateRange.startDate,
        endDate: moment(dateRange.startDate).add(1, "days").toDate(),
      });
    } else {
      setDateRange({
        startDate: dateRange.startDate,
        endDate: moment(dateRange.endDate).isAfter(dateRange.startDate, "day")
          ? dateRange.endDate
          : dateRange.startDate,
      });
    }
  };

  const handleDropoffChange = (newTime) => {
    if (newTime < pickupTime + MIN_TIME_DIFF) {
      return;
    }
    setDropoffTime(newTime);

    if (newTime >= MAX_TIME) {
      setDateRange({
        startDate: dateRange.startDate,
        endDate: moment(dateRange.startDate).add(1, "days").toDate(),
      });
    } else if (moment(dateRange.endDate).isAfter(dateRange.startDate, "day")) {
      setDateRange({
        startDate: dateRange.startDate,
        endDate: dateRange.startDate,
      });
    }
  };

  const handleDateChange = (newDateRange) => {
    setDateRange(newDateRange);

    const isToday = moment(newDateRange.startDate).isSame(moment(), "day");
    const adjustedPickupTime = isToday
      ? Math.max(currentMinutes, pickupTime)
      : pickupTime;
    const adjustedDropoffTime = Math.max(
      adjustedPickupTime + MIN_TIME_DIFF,
      dropoffTime
    );

    setPickupTime(adjustedPickupTime);
    setDropoffTime(adjustedDropoffTime);
  };
  function msToHours(ms) {
    let hours = (ms / (1000 * 60 * 60)).toFixed(1);

    return parseInt(hours);
  }
  useEffect(() => {
    function setDateAndTime(startDate, endDate, pickupTime, dropoffTime) {
      setPickupTimeAndDropoffTime({ pickupTime, dropoffTime });
      let PickupMilliSeconds = new Date(pickupTime).getTime();
      let DropoffMilliSeconds = new Date(dropoffTime).getTime();
      const totalBookedHours = Math.abs(
        msToHours(DropoffMilliSeconds) - msToHours(PickupMilliSeconds)
      );

      const startDateCheck =
        typeof startDate == "object"
          ? startDate?.toISOString().substring(0, 10)
          : new Date(startDate).toISOString().substring(0, 10);
      const endDateCheck =
        typeof endDate == "object"
          ? endDate?.toISOString().substring(0, 10)
          : new Date(endDate).toISOString().substring(0, 10);
      setPickupDateAndDropOffDate({
        startDate: startDateCheck,
        endDate: endDateCheck,
      });
      setTotalBookedHours(totalBookedHours);
    }

    setDateAndTime(
      dateRange?.startDate || new Date(),
      dateRange?.endDate || new Date(),
      moment(dateRange.startDate)
        .startOf("day")
        .add(pickupTime % MINUTES_IN_DAY, "minutes")
        .format("MMMM D, YYYY hh:mm A"),
      moment(dateRange.endDate)
        .startOf("day")
        .add(dropoffTime % MINUTES_IN_DAY, "minutes")
        .format("MMMM D, YYYY hh:mm A")
    );
  }, [dateRange, pickupTime, dropoffTime]);
  return (
    <div className="relative w-full max-w-fit mx-auto z-10 bg-inherit">
      <button
        className="mt-5 flex flex-col gap-y-2 p-2 shadow-sm"
        onClick={() => setIsActive(!isActive)}
      >
        <span className="text-center text-primary">Selected Date and Time</span>
        <div className="flex gap-x-2">
          <div>
            Pick Up:{" "}
            {moment(dateRange.startDate)
              .startOf("day")
              .add(pickupTime % MINUTES_IN_DAY, "minutes")
              .format("MMMM D, YYYY hh:mm A")}
          </div>

          <div>
            Drop Off:{" "}
            {moment(dateRange.endDate)
              .startOf("day")
              .add(dropoffTime % MINUTES_IN_DAY, "minutes")
              .format("MMMM D, YYYY hh:mm A")}
          </div>
        </div>
      </button>
      {isActive && (
        <div className="absolute translate-y-1 rounded-md p-2 w-full bg-slate-600">
          <div>
            <span>Pick Up and Drop Off Date</span>
            <DatePicker
              value={dateRange}
              onChange={handleDateChange}
              minDate={today}
              displayFormat="MMMM D, YYYY"
            />
          </div>
          <div style={{ marginTop: 20 }}>
            <span>Pick Up Time</span>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>{formatTime(pickupTime)}</div>
              <Slider
                min={MIN_TIME}
                max={MAX_TIME}
                step={15}
                value={pickupTime}
                onChange={handlePickupChange}
              />
            </div>
          </div>
          <div className="mt-5">
            <span>Drop Off Time</span>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>{formatTime(dropoffTime)}</div>
              <Slider
                min={MIN_TIME}
                max={MAX_TIME}
                step={15}
                value={dropoffTime}
                onChange={handleDropoffChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeRangeSlider;
