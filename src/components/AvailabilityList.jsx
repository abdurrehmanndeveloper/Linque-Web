"use client";
import { fetchAvailabilities } from "@/store/slices/availability";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AvailabilityList({ date }) {
  const dispatch = useDispatch();
  const { buckets, loading, error } = useSelector(
    (state) => state.availability
  );
  
  const [token, setToken] = useState(null);

  // ✅ Safe token fetch on client only
  useEffect(() => {
    if (typeof window !== "undefined") {
      const t = localStorage.getItem("auth_token");
      setToken(t);
    }
  }, []);

  useEffect(() => {
    if (date && token) {
      dispatch(fetchAvailabilities({ date, token }));
    }
  }, [date, dispatch, token]);

  // Debug logs
  useEffect(() => {
    console.log("📌 Buckets state:", buckets);
    console.log("📌 Error state:", error);
  }, [buckets, error]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const seatCategories = [
    { key: "2", label: "02 Seats" },
    { key: "4", label: "04 Seats" },
    { key: "6", label: "06 Seats" },
    { key: "8", label: "08 Seats" },
    { key: "10", label: "10 Seats" },
    { key: "11-15", label: "11-15 Seats" },
    { key: "16-20", label: "16-20 Seats" },
    { key: "21-25", label: "+20 Seats" },
    { key: "26-30", label: "+30 Seats" },
    { key: "31+", label: "+50 Seats" },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Seat Availability Grid
      </h2>

      {buckets && Object.keys(buckets).length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {seatCategories.map((category) => {
            const availableCount = buckets[category.key] || 0;
            const isAvailable = availableCount > 0;

            return (
              <div
                key={category.key}
                className={`
                  p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-lg
                  ${
                    isAvailable
                      ? "border-gray-300 bg-gray-50 hover:border-purple-400"
                      : "border-gray-200 bg-gray-100 opacity-60"
                  }
                `}
              >
                <div className="text-center">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {category.label}
                  </h3>
                  <div
                    className={`
                    text-lg font-bold
                    ${isAvailable ? "text-green-600" : "text-gray-400"}
                  `}
                  >
                    {availableCount} available
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">
            No slots available for this date.
          </p>
        </div>
      )}

      {/* Summary Stats */}
      {buckets && Object.keys(buckets).length > 0 && (
        <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-purple-800">
                Total Available Seats
              </h3>
              <p className="text-2xl font-bold text-purple-600">
                {Object.values(buckets).reduce((sum, count) => sum + count, 0)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-purple-600">Last Updated</p>
              <p className="text-sm text-purple-500">
                {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
