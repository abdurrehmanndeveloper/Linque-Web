"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingTicker } from "@/store/slices/vendorReservationsSlice";

export default function BookingTicker() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.vendor);
  const { bookingTicker, loading } = useSelector((state) => state.vendorReservations);
  
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  // Fetch booking ticker when date changes
  useEffect(() => {
    if (token && selectedDate) {
      dispatch(fetchBookingTicker({ 
        token, 
        date: selectedDate
      }));
    }
  }, [token, selectedDate, dispatch]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (token && selectedDate) {
        dispatch(fetchBookingTicker({ 
          token, 
          date: selectedDate
        }));
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [token, selectedDate, dispatch]);

  const formatDisplayDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getSourceColor = (source) => {
    switch (source) {
      case 'LINQUE':
        return 'bg-blue-100 text-blue-800';
      case 'Walk-In':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 h-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Booking Ticker
        </h3>
        
        {/* Date Selector Only */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>

      {/* Live Booking Feed */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {loading ? (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
            <p className="text-xs text-gray-500 mt-1">Loading...</p>
          </div>
        ) : bookingTicker && bookingTicker.length > 0 ? (
          bookingTicker.map((booking, index) => (
            <div
              key={booking._id || index}
              className={`p-3 rounded-lg border ${
                index % 2 === 0 ? 'bg-green-50' : 'bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSourceColor(booking.source)}`}>
                  {booking.source || 'Unknown'}
                </span>
                <span className="text-xs text-gray-500">
                  {formatDisplayDate(booking.reservationDate)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm text-gray-800">
                  {booking.customer?.name || 'Walk-In Customer'}
                </span>
                <span className="text-xs text-gray-600">
                  {booking.numberOfPersons} persons
                </span>
              </div>
              
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-500">
                  ({booking.numberOfPersons.toString().padStart(2, '0')})
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(booking.createdAt).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-sm text-gray-500">No bookings found</p>
            <p className="text-xs text-gray-400 mt-1">
              Select a date to view bookings
            </p>
          </div>
        )}
      </div>

      {/* Summary */}
      {bookingTicker && bookingTicker.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Bookings:</span>
            <span className="font-semibold text-gray-800">{bookingTicker.length}</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-600">Last Updated:</span>
            <span className="text-gray-500">{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}
