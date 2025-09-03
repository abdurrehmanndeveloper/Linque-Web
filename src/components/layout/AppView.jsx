"use client";
import HeadingThree from "@/components/ui/Heading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar } from "lucide-react";
import TimeButton from "../ui/TimeBtn";
import { fetchAppViewReservations } from "@/store/slices/appViewReservationsSlice";

export default function AppView() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.vendor);
  const { reservations, loading } = useSelector((state) => state.appViewReservations);

  const [startDate, setStartDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedTime, setSelectedTime] = useState("21:00");

  const getLocalDateString = (date = new Date()) =>
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0");

  useEffect(() => {
    console.log("AppView useEffect triggered:", { token: !!token, startDate, selectedTime });

    if (!token) {
      console.log("No token available, skipping API call");
      return;
    }

    const dateString = startDate ? getLocalDateString(startDate) : getLocalDateString();
    const filters = {
      date: dateString,
      time: selectedTime,
      type: "walk-in" // Fetch walk-in bookings to match DashboardMain
    };

    console.log("AppView API call with filters:", filters);

    dispatch(fetchAppViewReservations({ token, filters }))
      .unwrap()
      .then((res) => {
        console.log("AppView reservations fetched successfully:", res);
        console.log("Number of reservations:", res?.length || 0);
      })
      .catch((err) => {
        console.error("AppView API call failed:", err);
      });
  }, [token, startDate, selectedTime, dispatch]);

  return (
    <div className="w-full sm:w-[20%] bg-[#134C46] flex flex-col text-white">
      {/* Booking Ticket Section */}
      <div className="border-b border-[#E6E6E6]/20 py-6 text-center">
        <HeadingThree
          className="text-[28px] font-semibold mb-2 sm:mb-3"
          text="Booking Ticket"
        />

        <div className="flex flex-col md:flex-row sm:flex-col justify-center items-center gap-4 sm:gap-6">
          {/* Date Picker Button */}
          <div className="relative">
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="bg-[#fff] text-[#134C46] flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1 rounded-full font-semibold text-sm sm:text-base md:text-lg whitespace-nowrap"
            >
              {startDate ? startDate.toLocaleDateString() : "Select Date"}
              <Calendar size={18} />
            </button>

            {showCalendar && (
              <div className="absolute z-50 mt-2 sm:mt-3 left-0">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    setShowCalendar(false);
                  }}
                  inline
                />
              </div>
            )}
          </div>

          {/* Time Picker Button */}
          <div className="relative">
            <TimeButton
              selectedTime={selectedTime}
              onTimeChange={setSelectedTime}
            />
          </div>
        </div>
      </div>

      {/* Booking List */}
      <div className="flex flex-col px-4 mt-4 space-y-4">
        {reservations.length > 0 ? (
          reservations.map((r) => (
            <div
              key={r._id}
              className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-3 rounded-4xl shadow-sm
            ${
              r.type === "Walk-In"
                ? "bg-white text-black"
                : "bg-[#6A14DC] text-white"
            }`}
            >
              <span className="font-medium text-sm sm:text-base mb-1 sm:mb-0">
                {r.type}
              </span>
              <span className="font-medium text-sm sm:text-base mb-1 sm:mb-0">
                {r.customerName || "Walk-In Customer"}
              </span>
              <span className="font-medium text-sm sm:text-base mb-1 sm:mb-0">
                {r.reservationTime}
              </span>
              <span className="font-medium text-sm sm:text-base mb-1 sm:mb-0">
                {r.reservationDate}
              </span>
              <span className="font-medium text-sm sm:text-base">
                ({r.numberOfPersons})
              </span>
            </div>
          ))
        ) : (
          <div className="text-white text-center py-8">
            {loading ? (
              <p>Loading bookings...</p>
            ) : (
              <div>
                <p className="mb-4">No bookings found for selected date/time.</p>
                <div className="text-sm">
                  <p className="mb-2">Debug Info:</p>
                  <p>Token: {token ? "Available" : "Not available"}</p>
                  <p>Date: {startDate ? startDate.toLocaleDateString() : "Today"}</p>
                  <p>Time: {selectedTime}</p>
                  <p className="mb-2 mt-4">To see bookings:</p>
                  <p>1. Sign up as a vendor at /signup</p>
                  <p>2. Log in at /login</p>
                  <p>3. Create bookings using the Add Booking form</p>
                  <p className="mt-2 text-xs">Check browser console for detailed logs</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
