import React from "react";
import Toggle from "./Toggle";

function Header() {
  return (
    <div className="bg-[#313131] text-white flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-7 py-4 gap-4 sm:gap-0">
      {/* Title */}
      <h1 className="font-semibold text-[28px] sm:text-[40px] text-center sm:text-left">
        Dashboard
      </h1>

      {/* Time Box */}
      <div className="py-1 px-4 sm:py-1 sm:px-5 justify-center border border-white rounded-full text-center">
        <span className="text-[18px] sm:text-[20px] font-medium">8:05 PM</span>
      </div>

      {/* Toggle */}
      <div className="flex items-center justify-center sm:justify-end gap-2 rounded-full px-3 py-1 text-[18px] sm:text-[23px] font-medium">
        <Toggle label="Open for Reservations" />
      </div>
    </div>
  );
}

export default Header;
