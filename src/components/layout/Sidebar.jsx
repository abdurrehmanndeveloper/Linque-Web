"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Wallet,
  User,
  History,
  Star,
  Tag,
  Heart,
  BookOpen,
  Shield,
  Bell,
  Menu,
  X,
  LogIn,
  ArrowRight,
} from "lucide-react";
import Heading from "../ui/Heading";
import Image from "next/image";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const menu = [
    { icon: Home, text: "Dashboard", path: "/dashboard" },
    { icon: Wallet, text: "Wallet", path: "/wallet" },
    { icon: User, text: "My Info", path: "/myinfo" },
    { icon: History, text: "Booking History", path: "/booking" },
    { icon: Star, text: "My Reviews", path: "/review" },
    { icon: Tag, text: "My Promotions", path: "/promotion" },
    { icon: Heart, text: "Help Centre", path: "/help" },
    { icon: BookOpen, text: "Terms & Policies", path: "/terms" },
    { icon: Shield, text: "Privacy Policy", path: "/privacy" },
    { icon: Bell, text: "Linque Updates", path: "/updates" },
  ];

  return (
    <>
      <div className="lg:hidden flex items-center justify-between bg-purple-600 text-white">
        {/* <h1 className="font-bold text-lg">Aylanto</h1> */}
        <button onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu size={24} />
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed lg:static top-0 left-0 h-screen w-[75%] sm:w-[60%] md:w-[40%] lg:w-[20%] bg-[url('/menuBg.png')] bg-cover bg-center text-white flex flex-col z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="lg:hidden flex justify-end p-4">
          <button onClick={() => setOpen(false)} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>

        <div className="py-6 px-6 sm:px-8 md:px-10 border-b border-[#FFFFFF]/20">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-[38px] font-bold">Menu</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white">
              <Image
                width={100}
                height={100}
                src="/restaurant.png"
                alt="Restaurant Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <Heading className="text-lg sm:text-xl md:text-[29px] text-left" text={"Aylanto"} />
              <p className="text-sm sm:text-base md:text-[19px] text-[#FBFBFB] font-medium">
                Restaurant
              </p>
              <p className="text-xs sm:text-sm md:text-[17px] text-[#FBFBFB] font-medium">
                (Indian) Karachi
              </p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 sm:py-8 md:py-10 ml-3 sm:ml-5">
          {menu.map((item, i) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={i}
                href={item.path}
                className={`flex items-center gap-3 px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg md:text-[20px] font-semibold transition-colors duration-200 rounded-l-3xl md:rounded-l-4xl mb-2 ${
                  isActive
                    ? "bg-white text-[#6A14DC]"
                    : "text-white hover:bg-purple-500"
                }`}
                onClick={() => setOpen(false)}
              >
                <Icon size={22} className="sm:w-6 sm:h-6 md:w-[26px] md:h-[26px]" color={isActive ? "#6A14DC" : "currentColor"} />
                <span>{item.text}</span>
                <ArrowRight
                  className="ml-auto"
                  size={18}
                  color={isActive ? "#6A14DC" : "currentColor"}
                />
              </Link>
            );
          })}
        </nav>

        <Link
          href="/login"
          className="absolute bottom-5 inset-x-0 mx-auto flex w-[120px] sm:w-[140px] md:w-[150px] items-center justify-center gap-2 sm:gap-3 rounded-full border border-transparent bg-white px-4 sm:px-5 md:px-6 py-2 sm:py-3 font-semibold text-black transition-colors duration-200 hover:bg-[#5C08CC] hover:text-white hover:border-white"
          onClick={() => setOpen(false)}
        >
          <LogIn size={18} />
          <span>Log In</span>
        </Link>
      </div>
    </>
  );
}
