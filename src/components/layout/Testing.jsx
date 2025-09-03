"use client";
import React, { useEffect, useState, useMemo } from "react";

const Testing = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    source: "",
    date: "",
    period: "",
  });

  // Get token from localStorage (example)
  const token = useMemo(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token") || "";
    }
    return "";
  }, []);

  // Fetch reservations
  const fetchReservations = async () => {
    if (!token) return;

    try {
      setLoading(true);
      setError("");

      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(
        `http://localhost:5000/api/vendor/reservations?${queryParams}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (!data.success) throw new Error(data.error || "Failed to fetch");

      setReservations(data.reservations || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial load + whenever filters change
  useEffect(() => {
    fetchReservations();
  }, [token, filters]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () =>
    setFilters({ status: "", source: "", date: "", period: "" });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Reservations</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4">
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="border rounded p-2"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          name="source"
          value={filters.source}
          onChange={handleFilterChange}
          className="border rounded p-2"
        >
          <option value="">All Sources</option>
          <option value="web">Web</option>
          <option value="phone">Phone</option>
          <option value="walkin">Walk-in</option>
        </select>

        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          className="border rounded p-2"
        />

        <select
          name="period"
          value={filters.period}
          onChange={handleFilterChange}
          className="border rounded p-2"
        >
          <option value="">No Period</option>
          <option value="week">Last 7 days</option>
          <option value="month">Last 30 days</option>
        </select>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={clearFilters}
          className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
        >
          Clear Filters
        </button>
        <button
          onClick={fetchReservations}
          className="px-3 py-2 rounded bg-black text-white"
        >
          Refresh
        </button>
      </div>

      {/* Data Display */}
      {loading && <p>Loading reservations…</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && reservations.length === 0 && (
        <p>No reservations found.</p>
      )}

      {!loading && !error && reservations.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 border text-left">Created</th>
                <th className="p-2 border text-left">Date</th>
                <th className="p-2 border text-left">Customer</th>
                <th className="p-2 border text-left">Email</th>
                <th className="p-2 border text-left">Status</th>
                <th className="p-2 border text-left">Source</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r) => (
                <tr key={r._id} className="odd:bg-white even:bg-gray-50">
                  <td className="p-2 border">
                    {r.createdAt ? new Date(r.createdAt).toLocaleString() : "-"}
                  </td>
                  <td className="p-2 border">{r.reservationDate || "-"}</td>
                  <td className="p-2 border">{r.customer?.name || "-"}</td>
                  <td className="p-2 border">{r.customer?.email || "-"}</td>
                  <td className="p-2 border capitalize">{r.status || "-"}</td>
                  <td className="p-2 border capitalize">{r.source || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Testing;
