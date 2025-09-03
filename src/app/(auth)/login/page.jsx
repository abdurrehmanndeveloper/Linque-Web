"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import logo from "../../../../public/logo-text.png";
import playStore from "../../../../public/play-store.png";
import appStore from "../../../../public/app-store.png";
import qrCode from "../../../../public/qr-code.png";
import Heading from "@/components/ui/Heading";
import { vendorLogin } from "../../../store/slices/vendorSlice";

export default function SignIn() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { user, loading, error } = useSelector((state) => state.vendor);

  // ✅ handle input changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ handle login
  const handleLogin = () => {
    if (!formData.email || !formData.password) {
      alert("Please enter email and password");
      return;
    }
    dispatch(vendorLogin({ email: formData.email, password: formData.password }));
  };

  // ✅ redirect when logged in
  useEffect(() => {
    if (user) {
      router.push("/dashboard"); // or /home
    }
  }, [user, router]);

  return (
    <div className="flex flex-row bg-gradient-to-br from-[#D155F5] to-[#5C08CC] min-h-screen">
      {/* Left Side */}
      <div className="w-1/2 flex flex-col justify-center items-center p-6">
        {/* Logo + Heading */}
        <div className="flex flex-row justify-center mb-6">
          <Image src={logo} height={287} width={719} alt="Logo" />
        </div>
        {/* Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-8 mb-8 poppins">
          <span className="text-white text-[30px] font-light leading-tight">
            Restaurants
          </span>
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <span className="text-white text-[30px] font-light leading-tight">
            Activities
          </span>
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <span className="text-white text-[30px] font-light leading-tight">
            Venues
          </span>
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <span className="text-white text-[30px] font-light leading-tight">
            Live Events
          </span>
        </div>

        <button className="bg-white cursor-pointer bg-opacity-20 backdrop-blur-sm poppins font-bold text-[#D155F5] hover:border-[#D155F5]  hover:bg-[#D155F5] hover:text-white py-2 rounded-full text-lg transition-all duration-300 border border-white border-opacity-20 mb-8 w-[250px]">
          About Us
        </button>

        {/* QR + App Links */}
        <div className="bg-[#000000]/50 rounded-[23px] w-[650px] p-6 flex flex-col">
          <div className="flex flex-row items-center justify-between rounded-lg">
            <Image src={qrCode} alt="QR Code" width={202} height={199} />
            <div className="flex flex-col items-center">
              <div className="rounded-md bg-black p-4">
                <Image
                  src={appStore}
                  alt="App Store"
                  className="h-[50px] w-full"
                />
              </div>
              <div className="rounded-md bg-black p-4 mt-2">
                <Image
                  src={playStore}
                  alt="Play Store"
                  className="h-[50px] w-full mt-2"
                />
              </div>
            </div>
          </div>
          <p className="text-[16px] text-white font-medium mt-2">
            Scan the QR Code to download the LINQUE App for a more optimal
            experience
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex flex-col items-center justify-center relative min-h-[600px] mt-8">
        {/* Sign In Box */}
        <div className="w-full max-w-[400px] rounded-2xl border border-white border-opacity-30 bg-opacity-10 backdrop-blur-md shadow-lg px-8 py-7 mb-6">
          <h2 className="text-white text-3xl poppins mb-2 leading-tight">
            Sign In
          </h2>
          <p className="text-white text-base poppins font-medium mb-6">
            Please Sign In to View Business Centre
          </p>

          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

          <div className="space-y-4">
            <div>
              <label className="text-white text-sm poppins font-medium block mb-2">
                Email
              </label>
              <input
                type="text"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="user123@gmail.com"
                className="w-full px-4 py-3 rounded-full text-white placeholder-white border border-white border-opacity-40 bg-transparent poppins text-base focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div>
              <label className="text-white text-sm poppins font-medium block mb-2">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="••••••••••"
                className="w-full px-4 py-3 rounded-full text-white placeholder-white border border-white border-opacity-40 bg-transparent poppins text-base focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full cursor-pointer text-purple-700 py-2 rounded-full poppins font-bold text-lg bg-white hover:bg-purple-100 transition disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Log In"}
            </button>
          </div>

          <div className="text-center mt-2">
            <button className="text-white text-xs poppins font-medium hover:opacity-80 transition-opacity cursor-pointer">
              Forgot password?
            </button>
          </div>
          <div className="text-center mt-6">
            <span className="text-white text-base poppins font-medium">
              Don't have an account?
            </span>
            <button
              onClick={() => router.push("/signup")}
              className="text-white text-base poppins font-bold ml-1 hover:opacity-80 transition-opacity underline cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </div>
        {/* Sign Up Box */}
        <div className="w-full max-w-[400px] 1080:max-w-[400px] 1280:max-w-[400px] 2xl:max-w-[400px] 3xl:max-w-[555px] rounded-xl 1080:rounded-2xl border border-white border-opacity-30 bg-opacity-10 backdrop-blur-md shadow-lg px-6 1080:px-8 2xl:px-10 py-4 1080:py-5 2xl:py-6 mb-4 1080:mb-6 2xl:mb-8">
          <div className="flex items-center justify-center">
            <button className="w-full cursor-pointer max-w-[250px] 1080:max-w-[300px] 3xl:max-w-[350px] text-purple-700 py-2 1080:py-3 rounded-full poppins font-bold text-sm 1080:text-base 2xl:text-lg bg-white hover:bg-purple-100 transition mb-2">
              Sign Up
            </button>
          </div>
          <div className="text-center">
            <span className="text-white text-xs 1080:text-sm poppins font-medium">
              Want your business on LINQUE?
            </span>
          </div>
          <div className="text-center">
            <span className="inline-block text-white text-sm 1080:text-base poppins font-bold border-b-2 border-white pb-1 cursor-pointer">
              Click Here
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
