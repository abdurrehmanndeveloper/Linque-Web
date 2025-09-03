"use client";
import React from "react";
import { useSelector } from "react-redux";

export default function Seat({ selectedDate }) {
  const { buckets, loading, error } = useSelector((state) => state.availability);

  if (loading) return <p>Loading seat availability...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!buckets || Object.keys(buckets).length === 0) return <p>No seats found.</p>;

  return (
    <div className="grid grid-cols-2 gap-3 bg-red-600">
      {Object.entries(buckets).map(([category, count]) => (
        <div key={category} className="p-3 border rounded-lg shadow">
          <p className="font-medium">Table for {category}</p>
          <p className="text-sm text-gray-600">Available: {count}</p>
        </div>
      ))}
    </div>
  );
}
