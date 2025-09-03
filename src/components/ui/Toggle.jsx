"use client";
import React, { useState } from "react";

export default function Toggle({ label }) {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <span className="text-[23px] font-medium">{label}</span>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`w-12 h-6 flex items-center rounded-full p-1 mt-1 transition-colors duration-300
          ${enabled ? "bg-purple-600" : "bg-gray-300"}`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300
            ${enabled ? "translate-x-6" : "translate-x-0"}`}
        ></div>
      </button>
    </div>
  );
}
