import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Clock } from "lucide-react";

export default function TimeButton({ selectedTime, onTimeChange }) {
  const [time, setTime] = useState(selectedTime ? new Date(`1970-01-01T${selectedTime}:00`) : new Date());
  useEffect(() => {
    if (selectedTime) {
      const [hours, minutes] = selectedTime.split(':');
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      setTime(date);
    }
  }, [selectedTime]);

  const handleTimeChange = (newTime) => {
    setTime(newTime);
    if (onTimeChange) {
      const hours = newTime.getHours().toString().padStart(2, '0');
      const minutes = newTime.getMinutes().toString().padStart(2, '0');
      onTimeChange(`${hours}:${minutes}`);
    }
  };

  return (
    <DatePicker
      selected={time}
      onChange={handleTimeChange}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      dateFormat="h:mm aa"
      customInput={
        <button className="bg-[#fff] text-[#134C46] flex items-center border border-white gap-2 px-2 sm:px-3 lg:px-2 py-1 sm:py-1 rounded-full font-semibold shadow text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap">
          {selectedTime ? formatTime(selectedTime) : "Select Time"}
          <Clock size={16} />
        </button>
      }
    />
  );
}

function formatTime(time) {
  const [hour, minute] = time.split(":");
  const h = parseInt(hour);
  const suffix = h >= 12 ? "pm" : "am";
  const formattedHour = h % 12 === 0 ? 12 : h % 12;
  return `${formattedHour}:${minute} ${suffix}`;
}
