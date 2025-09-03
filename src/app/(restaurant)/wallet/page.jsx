import Header from "@/components/ui/Header";
import { Calendar } from "lucide-react";
import React from "react";

const Page = () => {
  return (
    <>
      <Header />

      <div className="p-3 sm:p-6 lg:p-10">
        <div className="flex flex-col bg-[#D2D5DB]/50 rounded-2xl h-[calc(100vh-160px)] overflow-y-auto p-4 sm:p-8 lg:p-12">
          
          {/* Date Button */}
          <div className="flex justify-center mb-6">
            <button className="bg-[#134C46] text-white flex items-center gap-2 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full font-semibold shadow text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap">
              February 17, 2025
              <Calendar size={18} />
            </button>
          </div>

          {/* Waitlist Row */}
          <div
            className="flex flex-col md:flex-row justify-between items-center gap-4 bg-cover bg-center rounded-xl p-4"
            style={{
              backgroundImage: `url('/waitlist.png')`,
              width: "100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            {/* Info Card */}
            <div className="bg-white flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 p-3 rounded-[27px] w-full md:w-auto text-center sm:text-left">
              <span className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg">
                Asadjameel
              </span>
              <span className="text-black font-semibold text-xs sm:text-sm md:text-base lg:text-lg">
                Feb 17
              </span>
              <span className="text-black font-semibold text-xs sm:text-sm md:text-base lg:text-lg">
                9:00 PM
              </span>
              <span className="text-black font-semibold text-xs sm:text-sm md:text-base lg:text-lg">
                (03)
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button className="bg-transparent border border-white hover:bg-white hover:text-black text-white px-4 sm:px-6 lg:px-8 py-2 rounded-[27px] font-semibold text-xs sm:text-sm md:text-base transition w-full sm:w-auto">
                Remove
              </button>
              <button className="bg-[#6A14DC] hover:bg-white hover:text-black text-white px-4 sm:px-6 lg:px-8 py-2 rounded-[27px] font-semibold text-xs sm:text-sm md:text-base transition w-full sm:w-auto">
                Bump
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
