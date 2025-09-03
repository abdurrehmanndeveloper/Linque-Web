"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../ui/Header";
import Seats from "../ui/layouttab/Seats";
import AddBooking from "../vendor/AddBooking";
import { fetchVendorReservations } from "@/store/slices/vendorReservationsSlice";
import { fetchAvailabilities } from "@/store/slices/availabilitySlice";
import { DEFAULT_SEAT_CONFIG } from "@/config/seatConfig";

export default function DashboardMain({ setOpen }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.vendor);
  const { reservations, loading } = useSelector(
    (state) => state.vendorReservations
  );
  const availability = useSelector((state) => state.availability);
  const buckets = availability?.buckets || {};

  const getLocalDateString = (date = new Date()) =>
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0");

  const [selectedDate, setSelectedDate] = useState(getLocalDateString());
  const [activeTab, setActiveTab] = useState("Today");
  const [activeTab1, setActiveTab1] = useState("My Booking");

  const tabs = ["Today", "This Week", "This Month", "All"];
  const tabs1 = ["My Booking", "Linque Bookings", "Layout"];

  useEffect(() => {
    if (!token) return;
    let filters = { type: activeTab1 === "My Booking" ? "walk-in" : "app" };

    if (activeTab1 === "My Booking") {
      filters.date = selectedDate;
      dispatch(fetchAvailabilities({ token, date: selectedDate }));
    } else if (activeTab1 === "Linque Bookings") {
      const today = new Date();
      let start, end;
      switch (activeTab) {
        case "Today":
          filters.date = getLocalDateString(today);
          break;
        case "This Week":
          start = new Date(today);
          start.setDate(today.getDate() - 7);
          end = today;
          filters.startDate = start.toISOString().split("T")[0];
          filters.endDate = end.toISOString().split("T")[0];
          break;
        case "This Month":
          start = new Date(today);
          start.setMonth(today.getMonth() - 1);
          end = today;
          filters.startDate = start.toISOString().split("T")[0];
          filters.endDate = end.toISOString().split("T")[0];
          break;
        case "All":
          break;
      }
    }

    dispatch(fetchVendorReservations({ token, filters }))
      .unwrap()
      .then((res) => console.log("Reservations fetched:", res))
      .catch((err) => console.error(err));
  }, [token, activeTab1, activeTab, selectedDate, dispatch]);

  const formatDisplayDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex-1 p-4 sm:p-10 overflow-hidden">
        <div className="flex flex-col bg-[#D2D5DB]/50 rounded-2xl min-h-[400px] overflow-y-auto">
          <div className="flex flex-wrap gap-3 sm:gap-6 justify-center px-2 sm:px-6 py-2">
            {tabs1.map((tab1) => (
              <button
                key={tab1}
                onClick={() => setActiveTab1(tab1)}
                className={`px-4 py-2 sm:p-4 font-medium text-[16px] sm:text-[18px] rounded-[30px] transition-colors ${
                  activeTab1 === tab1 
                    ? "text-white bg-[#6A14DC] border-b-4"
                    : "text-black"
                }`}
              >
                {tab1}
              </button>
            ))}
          </div>

          {activeTab1 === "Linque Bookings" && (
            <div className="flex flex-wrap md:flex-nowrap w-full items-center px-4 sm:px-6 py-1 gap-6">
              <div className="bg-[#6A14DC] whitespace-nowrap px-4 sm:px-6 py-2 rounded-full font-semibold text-white text-[18px] flex-shrink-0">
                Available Seats
              </div>
              <div className="flex flex-wrap sm:flex-nowrap gap-4 sm:gap-10 border-b border-gray-300 flex-1 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 font-medium text-[16px] sm:text-[18px] flex-shrink-0 transition-colors ${
                      activeTab === tab
                        ? "text-[#6A14DC] border-b-4 border-[#6A14DC]"
                        : "text-black hover:text-[#6A14DC]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="overflow-y-auto p-4 sm:px-6 flex-1 max-h-[750px]">
            {activeTab1 === "Layout" ? (
              <Seats />
            ) : (
              <div className="flex flex-col gap-4">
                {activeTab1 === "My Booking" && (
                  <>
                    <AddBooking
                      setSelectedDate={setSelectedDate}
                      refreshReservations={(date) => {
                        const filters = { date, type: "walk-in" };
                        dispatch(fetchVendorReservations({ token, filters }));
                        dispatch(fetchAvailabilities({ token, date }));
                      }}
                    />

                    <div className="px-4 sm:px-6 justify-center flex flex-wrap sm:flex-nowrap items-center gap-4">
                      <div className="bg-[#134C46] text-white text-center text-[23px] px-8 py-1 rounded-full font-semibold shadow whitespace-nowrap">
                        {formatDisplayDate(selectedDate)}
                      </div>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="px-3 py-2 text-white font-bold bg-[#134c46] border border-[#134c46] rounded-[30px] focus:ring-2 focus:ring-[#134c46] focus:border-[#134c46]"
                      />
                    </div>

                    <div className="flex flex-col lg:flex-row gap-4 overflow-y-auto">
                      <div
                        className="flex-1 p-9 rounded-[30px]"
                        style={{
                          backgroundImage:
                            reservations.length > 0
                              ? "url('/waitlist.png')"
                              : "none",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                      >
                        {reservations.map((r) => (
                          <div className="p-4" key={r._id}>
                            <div
                              className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-3 rounded-[30px] ${
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
                          </div>
                        ))}
                      </div>

                      <div
                        className="flex-1 bg-black p-4 rounded-[30px]"
                        style={{
                          backgroundImage:
                            reservations.length > 0
                              ? "url('/waitlist.png')"
                              : "none",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                      >
                        <h3 className="text-lg text-center font-semibold mb-4 text-white">
                          Available Seats
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(DEFAULT_SEAT_CONFIG).map(([key]) => {
                            const availableCount = buckets[key] || 0;
                            return (
                              <div
                                key={key}
                                className="flex flex-row justify-between items-center p-2 bg-white rounded-[30px]"
                              >
                                <span className="text-[20px] text-black font-semibold mb-2">
                                  {key} seats
                                </span>
                                <span className="font-bold bg-purple-800 text-white text-lg px-6 py-1 rounded-full">
                                  {availableCount}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {reservations.length > 0 ? (
                    reservations.map((r) => (
                      <div
                        key={r._id}
                        className="bg-gradient-to-br from-[#7118DE] to-[#BF4AF1] text-white rounded-[15px] flex flex-col justify-between"
                      >
                        <div className="text-center border-b-4 border-white text-[18px] font-semibold py-3 px-6">
                          Booking ID: {r._id.slice(-6)}
                        </div>
                        <div className="px-5 py-5 space-y-1">
                          <p>Date: {r.reservationDate}</p>
                          <p>
                            Name: {r.customerName || "Walk-In Customer"}
                          </p>
                          <p>Type: {r.type}</p>
                          <p>Time: {r.reservationTime}</p>
                          <p>Total Guests: {r.numberOfPersons}</p>
                          <p>Promo Code: {r.promoCode || "N/A"}</p>

                          <div className="bg-white rounded-md p-2">
                            <span className="text-black text-[14px] font-medium">
                              Note:
                            </span>
                            <textarea
                              className="w-full mt-1 p-2 border-t resize-none h-12 bg-white text-black text-[13px]"
                              placeholder={r.notes || "No notes"}
                              readOnly
                            />
                          </div>

                          <div className="mt-3 flex gap-2 flex-wrap">
                            <button className="bg-transparent border-1 borde-[#fff] hover:bg-white hover:text-[#A259FF] hover:border-1 border-[#fff] text-white px-5 py-2 rounded-full text-[11px] font-semibold">
                              Reservation Complete
                            </button>
                            <button className="bg-white text-[#A259FF] border px-5 py-2 rounded-full text-[11px] font-semibold hover:bg-transparent hover:text-white hover:border">
                              Contact Customer
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="col-span-full text-gray-500 text-center py-8">
                      {loading ? "Loading reservations..." : "No bookings found."}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
