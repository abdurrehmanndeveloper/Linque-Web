"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, Clock, ChevronDown } from "lucide-react";
import { fetchVendorReservations } from "@/store/slices/vendorReservationsSlice";
import { fetchAvailabilities } from "@/store/slices/availabilitySlice";

export default function AddBooking() {
  const dispatch = useDispatch();
  const token =
    useSelector((state) => state.vendor?.token) ||
    localStorage.getItem("auth_token");

  const [formData, setFormData] = useState({
    customerName: "",
    reservationDate: new Date(),
    reservationTime: new Date(),
    numberOfPersons: "Guests",
    notes: "",
    type: "Walk-In",
  });


  const [openType, setOpenType] = useState(false);
  const [openGuests, setOpenGuests] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [createdBooking, setCreatedBooking] = useState(null);

  const typeOptions = ["Walk-In", "linque"];
  const guestOptions = ["1", "2", "3", "4", "5", "6+"];

const handleSubmit = async () => {
  if (!formData.customerName.trim()) {
    setMessage("❌ Customer name is required");
    return; // stop execution
  }

  setLoading(true);
  setMessage("");
  setCreatedBooking(null);
  console.log("Submitting booking:", formData);

  try {
    const res = await fetch("http://localhost:5000/api/vendor/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        customerName: formData.customerName.trim(),
        reservationDate: formData.reservationDate.toISOString().split("T")[0],
        reservationTime: formData.reservationTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        numberOfPersons: parseInt(formData.numberOfPersons),
        notes: `Booking via frontend (${formData.type})`,
        type: formData.type.toLowerCase(),
      }),
    });

    const data = await res.json();
    console.log("Booking response:", data);

    if (!res.ok) throw new Error(data.error || "Failed to create booking");

    dispatch(
      fetchVendorReservations({
        token,
        filters: {
          date: formData.reservationDate.toISOString().split("T")[0],
        },
      })
    );
    dispatch(
      fetchAvailabilities({
        token,
        date: formData.reservationDate.toISOString().split("T")[0],
      })
    );

    setMessage("✅ Booking created successfully!");
    setCreatedBooking(data.reservation);

    setFormData({
      customerName: "",
      reservationDate: new Date(),
      reservationTime: new Date(),
      numberOfPersons: "Guests",
      notes: "",
      type: "Type",
    });
  } catch (err) {
    console.error(err);
    setMessage(`❌ ${err.message}`);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="p-4">
      <h1 className="text-[32px] text-black font-bold text-center mb-3">
        Add Booking
      </h1>

      <div className="flex flex-wrap gap-3 justify-center mb-6 bg-white rounded-[30px] py-2 relative">
        <div className="relative">
          <button
            onClick={() => setOpenType(!openType)}
            className="bg-purple-600 text-white px-4 py-2 rounded-full w-[150px] flex justify-between items-center"
          >
            {formData.type} <ChevronDown size={16} />
          </button>
          {openType && (
            <div className="absolute mt-2 w-[150px] bg-white shadow-lg rounded-xl z-20">
              {typeOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setFormData({ ...formData, type: opt });
                    setOpenType(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-100 rounded-lg"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        <input
          className="bg-purple-600 text-white px-4 py-2 rounded-full placeholder-white"
          type="text"
          placeholder="Name*"
          value={formData.customerName}
          onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
        />

        <DatePicker
          selected={formData.reservationDate}
          onChange={(newDate) =>
            setFormData({ ...formData, reservationDate: newDate })
          }
          dateFormat="MMMM d, yyyy"
          customInput={
            <button className="bg-purple-600 text-white px-4 py-2 rounded-full w-[150px] flex justify-between items-center">
              Date <Calendar size={16} />
            </button>
          }
        />

        <DatePicker
          selected={formData.reservationTime}
          onChange={(newTime) =>
            setFormData({ ...formData, reservationTime: newTime })
          }
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          dateFormat="h:mm aa"
          customInput={
            <button className="bg-purple-600 text-white px-4 py-2 rounded-full w-[150px] flex justify-between items-center">
              Time <Clock size={16} />
            </button>
          }
        />

        <div className="relative">
          <button
            onClick={() => setOpenGuests(!openGuests)}
            className="bg-purple-600 text-white px-4 py-2 rounded-full w-[150px] flex justify-between items-center"
          >
            {formData.numberOfPersons} <ChevronDown size={16} />
          </button>
          {openGuests && (
            <div className="absolute mt-2 w-[120px] bg-white shadow-lg rounded-xl z-20">
              {guestOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setFormData({ ...formData, numberOfPersons: opt });
                    setOpenGuests(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-100 rounded-lg"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-green-600 text-white px-6 py-3 rounded-full font-bold shadow hover:bg-green-700"
        >
          {loading ? "Saving..." : "Save Booking"}
        </button>

        {message && <p className="mt-3 text-red-600">{message}</p>}
      </div>
    </div>
  );
}
