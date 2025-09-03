"use client";
import { useState } from "react";
import { Filter } from "lucide-react"; // or your icon lib

export default function FilterBtn() {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  return (
    <div>
      <button
        onClick={toggleFilters}
        className="flex items-center gap-2 px-4 py-2"
      >
        <Filter size={18} />
        <span className="font-semibold text-[16px] sm:text-[19px] text-black">
          Filters
        </span>
      </button>

      {showFilters && (
        <div
          className={`transition-all duration-300 ${
            showFilters
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          {/* Filters */}
          <p className="text-sm text-gray-700">Filter options go here.</p>
        </div>
      )}
    </div>
  );
}
