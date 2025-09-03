"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAvailabilities } from "@/store/slices/availability";
import { DEFAULT_SEAT_CONFIG } from "@/config/seatConfig";
import Image from "next/image";

export default function Seats() {
  const dispatch = useDispatch();
  const { buckets, loading, error } = useSelector(
    (state) => state.availability
  );
  const { user, token } = useSelector((state) => state.vendor);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [requestLoading, setRequestLoading] = useState(false);

  // Debug vendor state
  console.log("Seats component - Vendor state:", { user, token });

  // Token is now managed by Redux store

  // Fetch availabilities when date changes (no time needed)
  useEffect(() => {
    if (selectedDate && token) {
      dispatch(fetchAvailabilities({ date: selectedDate, token }));
    }
  }, [selectedDate, token, dispatch]);

  // Handle layout update request
  const handleRequestUpdate = async () => {
    if (!token) {
      alert("Please log in to send a request.");
      return;
    }

    if (!user) {
      console.log("User data not available, attempting to refresh...");
      // Try to refresh vendor data
      try {
        const backendUrl =
          process.env.NODE_ENV === "production"
            ? "https://your-production-backend.com"
            : "http://localhost:5000";

        const response = await fetch(`${backendUrl}/api/vendor-auth/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          // For now, use basic user info from token verification
          const tempUser = {
            email: data.user?.email || "vendor@restaurant.com",
            name: data.user?.name || "Restaurant",
            _id: data.user?._id || "temp_id",
          };

          // Proceed with the request using temp user data
          await sendUpdateRequest(tempUser);
        } else {
          alert(
            "Unable to verify vendor information. Please try logging in again."
          );
        }
      } catch (error) {
        console.error("Verification error:", error);
        alert(
          "Unable to verify vendor information. Please try logging in again."
        );
      }
      return;
    }

    await sendUpdateRequest(user);
  };

  const sendUpdateRequest = async (userData) => {
    setRequestLoading(true);

    try {
      const backendUrl =
        process.env.NODE_ENV === "production"
          ? "https://your-production-backend.com"
          : "http://localhost:5000";

      const response = await fetch(`${backendUrl}/api/slot/request-update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: userData.email,
          restaurantName: userData.name || "Restaurant",
          message:
            "Please update my restaurant layout and seating arrangement.",
          vendorId: userData._id,
          date: selectedDate,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("Layout update request sent successfully!");
      } else {
        alert("Failed to send request: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Request update error:", error);
      alert("Error sending request: " + error.message);
    } finally {
      setRequestLoading(false);
    }
  };

  const seatCategories = DEFAULT_SEAT_CONFIG;

  // Format date for display
  const formatDisplayDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="space-y-1 h-[700px] overflow-y-auto">
      {/* Date Selector Only - Commented out as per user request */}
      {/*
      <div className="flex items-center justify-between bg-white rounded-lg p-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">
            Select Date:
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <div className="bg-[#134C46] text-white text-center text-[23px] px-8 py-1 rounded-full font-semibold shadow whitespace-nowrap">
          <h3>{formatDisplayDate(selectedDate)}</h3>
        </div>
      </div>
      */}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <p className="mt-2 text-gray-600">Loading availability...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Error: {error}</p>
        </div>
      )}

      {/* Seat Availability Grid */}
      {!loading && !error && buckets && Object.keys(buckets).length > 0 && (
        <div className="p-6">
          {/* <h3 className="text-xl font-semibold text-gray-800 mb-6">
            {formatDisplayDate(selectedDate)}
          </h3> */}

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {Object.entries(seatCategories).map(([key, value]) => {
              const availableCount = buckets[key] || 0;
              const isAvailable = availableCount > 0;

              return (
                <div
                  key={key}
                  className={`
                    relative p-4 rounded-xl overflow-hidden
                    ${isAvailable ? "border-green-400" : "border-gray-300"}
                  `}
                    >
                  <div className="relative p-4 rounded-xl overflow-hidden">
                    <Image
                      src="/seats.png"
                      alt="seats bg"
                      fill
                      className="object-cover"
                    />

                    <div
                      className={`
                    p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md
                    ${
                        isAvailable
                          ? "border-gray-300 hover:border-purple-400"
                          : "border-gray-200 opacity-60"
                      }
                    `}
                    >
                      <div className="relative text-center">
                        <h4 className="font-semibold text-white mb-2 text-[21px]">
                          {key}
                        </h4>
                        <div
                          className={`text-lg font-bold bg-white rounded-4xl ${
                            isAvailable ? "text-black" : "text-gray-400"
                          }`}
                        >
                          {availableCount}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* No Slots Available */}
      {!loading &&
        !error &&
        (!buckets || Object.keys(buckets).length === 0) && (
          <div className="p-8 text-center">
            <p className="text-gray-500 text-lg mb-4">
              No slots available for this date.
            </p>
            <p className="text-gray-400 text-sm">
              Slots will be automatically created when you first view a date.
            </p>
          </div>
        )}
      {/* Request Update Button */}
      <div className="text-center">
        <button
          onClick={handleRequestUpdate}
          disabled={requestLoading || !token}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          {requestLoading ? "Sending Request..." : "Request Update"}
        </button>
        <p className="text-sm text-gray-500 mt-2">
          {!token
            ? "Please log in to request updates"
            : "Contact admin to modify your restaurant layout"}
        </p>
      </div>
    </div>
  );
}
