"use client";
import { useState } from "react";
import { Filter, Search } from "lucide-react";
import CalendarScreen from "@/components/ui/CalendarScreen";
import Header from "@/components/ui/Header";
import BookingCard from "@/components/cards/BookingCard";
import FilterBtn from "@/components/ui/FilterBtn";

export default function Page({ setOpen }) {
  const [activeTab, setActiveTab] = useState("Today");

  const bookings = [
    {
      id: "21648",
      note: "note",
      date: "10/02/25",
      name: "Asadjamal",
      location: "Kappadokya New",
      time: "8:00 PM",
      total: "0",
      promo: "N/A",
      category: "Today",
    },
    {
      id: "21649",
      note: "note",
      date: "14/02/25",
      name: "Ali Khan",
      location: "Istanbul Cafe",
      time: "7:00 PM",
      total: "2",
      promo: "LOVE14",
      category: "This Week",
    },
    {
      id: "21650",
      note: "note",
      date: "25/02/25",
      name: "Sara Ahmed",
      location: "BBQ Tonight",
      time: "9:00 PM",
      total: "4",
      promo: "FEB25",
      category: "This Month",
    },
  ];

  const tabs = ["Today", "This Week", "This Month", "All"];

  const filteredBookings =
    activeTab === "All"
      ? bookings
      : bookings.filter(
          (b) => b.category.toLowerCase() === activeTab.toLowerCase()
        );

  return (
    <div>
      <Header />

      <div className="p-10">
        <div className="flex flex-col bg-[#D2D5DB]/50 rounded-2xl h-[calc(100vh-160px)] overflow-y-auto">
          {/* Tabs */}
          <div className="flex w-full items-center px-4 sm:px-6 py-4 gap-6">
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

          {/* Search + Filter */}
          <div className="px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="bg-[#134C46] text-white text-center text-[18px] sm:text-[23px] px-6 sm:px-8 py-2 rounded-full font-semibold shadow whitespace-nowrap">
              Monday, February 10, 2025
            </div>

            <div className="flex items-center gap-2 bg-white rounded-full border-1 border-[#707070]/46 px-3 py-2 w-full sm:w-[563px] shadow">
              <Search size={18} className="text-gray-500" />
              <input
                type="search"
                className="flex-1 outline-none text-sm sm:text-base bg-transparent"
                placeholder="Search"
              />
            </div>

            {/* <button className="flex items-center gap-2 px-4 py-2">
              <Filter size={18} />
              <span className="font-semibold text-[16px] sm:text-[19px] text-black">
                Filters
              </span>
            </button> */}
            <FilterBtn />
          </div>

          {/* Main Content */}
          <div className="overflow-y-auto p-4 sm:px-6">
            {activeTab === "All" && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <CalendarScreen />
                <div className="bg-black rounded-3xl p-2 flex justify-between items-center h-[60px]">
                  <span className="text-white text-[20px] font-bold">
                    Overall Reservations
                  </span>
                  <span className="bg-gradient-to-br from-[#7118DE] to-[#BF4AF1] rounded-4xl p-2 text-[17px] font-bold text-white">
                    {bookings.length}
                  </span>
                </div>
              </div>
            )}

            {/* Bookings Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((b) => (
                  <BookingCard key={b.id} booking={b} />
                ))
              ) : (
                <p className="col-span-full text-gray-500">
                  No bookings found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
