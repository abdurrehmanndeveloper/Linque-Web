"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createWalkInReservation, fetchVendorReservations } from "@/store/slices/vendorReservationsSlice";
import { fetchAvailabilities } from "@/store/slices/availabilitySlice";

export default function AddBooking() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.vendor);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reservationDate: new Date().toISOString().split("T")[0],
    numberOfPersons: 2,
    notes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Please login to create bookings");
      return;
    }

    setLoading(true);
    try {
      await dispatch(
        createWalkInReservation({ token, reservationData: formData })
      ).unwrap();

      // Refresh reservations + availability
      dispatch(fetchVendorReservations({ token, filters: { date: formData.reservationDate } }));
      dispatch(fetchAvailabilities({ token, date: formData.reservationDate }));

      // Reset form
      setFormData({
        name: "",
        email: "",
        reservationDate: new Date().toISOString().split("T")[0],
        numberOfPersons: 2,
        notes: "",
      });

      alert("Walk-in reservation created successfully!");
    } catch (error) {
      alert(`Failed to create reservation: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const personOptions = Array.from({ length: 15 }, (_, i) => i + 1);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Add Walk-In Booking
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Customer Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Enter customer name"
          />
        </div>

        {/* Customer Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Enter customer email (optional)"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date *
          </label>
          <input
            type="date"
            name="reservationDate"
            value={formData.reservationDate}
            onChange={handleInputChange}
            required
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Number of Persons */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Persons *
          </label>
          <select
            name="numberOfPersons"
            value={formData.numberOfPersons}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            {personOptions.map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "person" : "persons"}
              </option>
            ))}
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Any special requests or notes..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
        >
          {loading ? "Creating..." : "Create Walk-In Booking"}
        </button>
      </form>

      <div className="mt-4 text-xs text-gray-500 text-center">
        * Required fields
      </div>
    </div>
  );
}
