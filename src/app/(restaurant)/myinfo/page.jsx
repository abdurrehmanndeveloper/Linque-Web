"use client";
import React from "react";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Restaurant from "../../../../public/food.png";
import Map from "../../../../public/map.png";
import Menu from "../../../../public/menu.png";
import Aylanto from "../../../../public/aylanto.png";
import Header from "@/components/ui/Header";

export default function Page() {
  return (
    <>
      <Header />
      <div className="p-6">
        <div className="flex flex-col bg-[#D2D5DB]/50 rounded-2xl min-h-[calc(100vh-140px)] p-6 relative">
          <div className="flex items-center gap-2 absolute top-3 right-6">
            <a href="#" className="font-medium text-black underline">
              Edit My Info
            </a>
            <Pencil className="w-5 h-5 text-purple-600" />
          </div>

          <div className="flex items-center justify-between mb-6 border-b border-[#707070]/25">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src={Aylanto}
                alt="Restaurant"
                className="w-20 h-20 rounded-full object-cover border-2 border-purple-500"
              />
              <h1 className="text-[28px] font-semibold">Aylanto</h1>
            </div>
            <div className="flex flex-wrap gap-4 mb-6">
              <div>
                <span className="block text-black text-[16px] text-center font-semibold">
                  Category
                </span>
                <span className="bg-[#6A14DC] text-white px-4 py-1 w-[150px] rounded-full font-semibold text-[18px]">
                  Restaurant
                </span>
              </div>
              <div>
                <span className="block text-black text-[16px] text-center font-semibold">
                  Cuisine
                </span>
                <span className="bg-[#6A14DC] text-white px-4 py-1 w-[150px] rounded-full font-semibold text-[18px]">
                  Italian
                </span>
              </div>
              <div>
                <span className="block text-black text-[16px] text-center font-semibold">
                  City
                </span>
                <span className="bg-[#6A14DC] text-white px-4 py-1 w-[150px] rounded-full font-semibold text-[18px]">
                  Karachi
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <Image
                src={Restaurant}
                alt="Food"
                className="w-full h-56 object-cover rounded-lg"
              />
              <div className="flex gap-2 mt-3 overflow-x-auto">
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <Image
                      key={i}
                      src={Restaurant}
                      alt="Food Thumb"
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  ))}
              </div>
            </div>
            <div className="flex flex-col gap-4 flex-1">
              <div className="bg-white p-4 rounded-lg">
                <div className="border-b border-[#6A14DC]/22">
                  <h2 className="font-bold text-[20px] mb-2">My Description</h2>
                </div>
                <p className="text-[14px] text-black mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  dignissim dolor quis varius faucibus. Mauris sit amet nunc
                  euismod, convallis felis ac, vulputate massa.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="border-b border-[#6A14DC]/22">
                  <h2 className="font-bold text-[20px] mb-2">My Address</h2>
                </div>
                <p className="text-[14px] text-black mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-6 flex-wrap">
            <button className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold">
              Age Requirement: +12
            </button>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold">
              View Deals & Discounts
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
            <div className="lg:col-span-1">
              <h2 className="font-semibold text-center text-lg mb-3">Menu</h2>
              <div className="bg-[#D2D5DB]/49 p-4 rounded-lg text-center">
                <Image src={Menu} alt="Menu" width={100} />
              </div>
            </div>

            <div className="lg:col-span-1">
              <h2 className="font-semibold text-center text-lg mb-3">
                Timings
              </h2>
              <div className="bg-[#D2D5DB]/49 p-4 rounded-lg">
                <ul className="space-y-2">
                  {[
                    ["Mon", "12pm to 11pm"],
                    ["Tue", "12pm to 11pm"],
                    ["Wed", "12pm to 11pm"],
                    ["Thu", "12pm to 11pm"],
                    ["Fri", "12pm to 12am"],
                    ["Sat", "12pm to 12am"],
                    ["Sun", "12pm to 12am"],
                  ].map(([day, time]) => (
                    <li key={day} className="flex justify-between text-sm">
                      <span className="font-medium">{day}:</span>
                      <span>{time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h2 className="font-semibold text-center text-lg mb-3">
                Location
              </h2>
              <div>
                <Image
                  src={Map}
                  alt="Map"
                  className="w-full h-40 rounded-lg object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center mt-6">
            <button className="bg-gray-300 text-black px-8 py-2 rounded-full font-medium cursor-not-allowed">
              Done
            </button>
            <p className="text-xs text-gray-500 mt-2">
              Last Edited on: Feb 17, 2025
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
