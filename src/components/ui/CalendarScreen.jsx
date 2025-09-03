"use client";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";


export default function CalendarScreen() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="p-4">
      <Calendar
        onChange={setDate}
        value={date}
       className="rounded-2xl shadow-lg bg-transparent p-4 text-black"
      />
      {/* <p className="mt-4 text-lg text-gray-700">
        Selected date: {date.toDateString()}
      </p> */}
    </div>
  );
}
