"use client";
import { useState } from "react";

export default function BookingCard({ booking }) {
  const [note, setNote] = useState(booking.note || "");

  return (
    <div className="bg-gradient-to-br from-[#7118DE] to-[#BF4AF1] text-white rounded-[15px] flex flex-col justify-between">
      {/* Header */}
      <div className="text-center border-b-4 border-white text-[18px] font-semibold py-3 px-6">
        Booking ID: {booking.id}
      </div>

      {/* Content */}
      <div className="px-5 py-5 space-y-1">
        <p>Date: {booking.date}</p>
        <p>Name: {booking.customerName || "Walk-In Customer"}</p>
        <p>Location: {booking.location}</p>
        <p>Time: {booking.time}</p>
        <p>Total Guests: {booking.total}</p>
        <p>Promo Code: {booking.promo}</p>

        {/* Notes */}
        <div className="bg-white rounded-md p-2">
          <span className="text-black text-[14px] font-medium">Note:</span>
          <textarea
            className="w-full mt-1 p-2 border-t resize-none h-12 bg-white text-black text-[13px] outline-none"
            placeholder="Add a note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="mt-3 flex gap-2">
          <button className="bg-transparent hover:bg-white hover:text-[#A259FF] hover:border-1 border-1 border-[#fff] text-white px-5 py-2 rounded-full text-[11px] font-semibold">
            Reservation Complete
          </button>
          <button className="bg-white text-[#A259FF] border px-5 py-2 rounded-full text-[11px] font-semibold hover:bg-transparent hover:text-white hover:border-1">
            Contact Customer
          </button>
        </div>
      </div>
    </div>
  );
}
