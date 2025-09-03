"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../public/logo.png";
import bgLogo from "../../public/bg-logo-signup.png";
import Heading from "@/components/ui/Heading";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login"); // redirect to login
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
      
      {/* 🔹 Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 z-0">
        <Image
          src={bgLogo}
          alt="Background Logo"
          
          className="object-contain"
        />
      </div>

      {/* 🔹 Center Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 relative z-10">
        {/* Logo + Headings */}
        <div className="flex flex-col items-center text-center mb-12">
          <Image src={logo} height={100} width={100} alt="Linque Logo" />
          <Heading className="text-white text-6xl font-bold mt-6 z-20">
            Linque
          </Heading>
          <Heading className="text-white text-2xl mt-2 z-20">
            Elevate Your Outings
          </Heading>
        </div>

        {/* Buttons */}
        <div className="flex gap-8 flex-wrap justify-center">
          <button className="bg-white cursor-pointer w-[300px] bg-opacity-20 backdrop-blur-sm poppins font-bold text-[#6A14DC] py-3 rounded-full text-xl hover:bg-opacity-30 transition-all duration-300 border border-white border-opacity-20">
            Business Centre
          </button>
          <button className="bg-white cursor-pointer w-[300px] bg-opacity-20 backdrop-blur-sm poppins font-bold text-[#6A14DC] py-3 rounded-full text-xl hover:bg-opacity-30 transition-all duration-300 border border-white border-opacity-20">
            About Us
          </button>
        </div>
      </div>

      {/* 🔹 Footer */}
      <div className="bg-[#313131] bg-opacity-80 backdrop-blur-sm h-20 flex items-center justify-between px-12 relative z-10">
        <span className="text-white text-lg poppins font-medium">Linque</span>
        <span className="text-white text-md poppins font-bold">
          Want your business on Linque?
        </span>
      </div>
    </div>
  );
}
