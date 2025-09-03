"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../../../public/logo-text.png";
import { vendorSignup } from "../../../store/slices/vendorSlice";

export default function SignUp() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector((state) => state.vendor);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    email: "",
    contactNumber: "",
    mailingAddress: "",
    city: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
  });

  // handle input changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // handle signup
  const handleSignup = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      alert("Please fill all required fields");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      mailingAddress: formData.mailingAddress,
      contactNumber: formData.contactNumber,
      city: formData.city,
      category: formData.category,
      profileImage: formData.profileImage || "https://via.placeholder.com/150",
    };

    dispatch(vendorSignup(payload));
  };

  // ✅ redirect when signed up
  useEffect(() => {
    if (user) {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <div className="flex flex-row bg-gradient-to-br from-[#D155F5] to-[#5C08CC] min-h-screen">
      {/* Left Side */}
      <div className="w-1/3 flex flex-col justify-center items-center p-20">
        <div className="flex justify-center mb-6">
          <Image src={logo} height={100} width={250} alt="Logo" />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 poppins">
          {["Restaurants", "Activities", "Venues", "Live Events"].map(
            (item, i) => (
              <React.Fragment key={item}>
                <span className="text-white text-[17px] font-light">
                  {item}
                </span>
                {i < 3 && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </React.Fragment>
            )
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="w-2/3 flex flex-col items-center justify-center px-10 py-12">
        <div className="w-full max-w-[900px] rounded-2xl border border-white backdrop-blur-md shadow-lg px-8 py-10">
          <h2 className="text-white text-[48px] font-light poppins mb-2 leading-tight">
            Sign Up to <span className="font-bold">Linque</span>
          </h2>
          <p className="text-white text-base poppins font-medium mb-6">
            Just a few quick things to get started
          </p>

          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

          {/* Grid for form */}
          <div className="grid grid-cols-2 gap-6">
            {/* Vendor Name */}
            <div className="flex flex-col">
              <label className="text-[15px] font-medium text-white mb-3">
                Vendor Name
              </label>
              <input
                type="text"
                placeholder="Vendor Name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="px-4 py-3 rounded-full text-white border border-white bg-transparent placeholder-white/70"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col">
              <label className="text-[15px] font-medium text-white mb-3">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="px-4 py-3 rounded-full text-white border border-white bg-transparent placeholder-white/70"
              >
                <option value="">Select Category</option>
                {/* ✅ Match backend exactly */}
                <option value="restaurants">Restaurants</option>
                <option value="activities">Activities</option>
                <option value="venues">Venues</option>
                <option value="live-events">Live Events</option>
              </select>
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-[15px] font-medium text-white mb-3">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="px-4 py-3 rounded-full text-white border border-white bg-transparent placeholder-white/70"
              />
            </div>

            {/* Contact Number */}
            <div className="flex flex-col">
              <label className="text-[15px] font-medium text-white mb-3">
                Contact Information
              </label>
              <input
                type="text"
                placeholder="Contact Information"
                value={formData.contactNumber}
                onChange={(e) => handleChange("contactNumber", e.target.value)}
                className="px-4 py-3 rounded-full text-white border border-white bg-transparent placeholder-white/70"
              />
            </div>

            {/* Mailing Address */}
            <div className="flex flex-col">
              <label className="text-[15px] font-medium text-white mb-3">
                Mailing Address
              </label>
              <input
                type="text"
                placeholder="Mailing Address"
                value={formData.mailingAddress}
                onChange={(e) => handleChange("mailingAddress", e.target.value)}
                className="px-4 py-3 rounded-full text-white border border-white bg-transparent placeholder-white/70"
              />
            </div>

            {/* City */}
            <div className="flex flex-col">
              <label className="text-[15px] font-medium text-white mb-3">
                City
              </label>
              <input
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className="px-4 py-3 rounded-full text-white border border-white bg-transparent placeholder-white/70"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="text-[15px] font-medium text-white mb-3">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className="px-4 py-3 rounded-full text-white border border-white bg-transparent placeholder-white/70"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col">
              <label className="text-[15px] font-medium text-white mb-3">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                className="px-4 py-3 rounded-full text-white border border-white bg-transparent placeholder-white/70"
              />
            </div>

            {/* ✅ Profile Image */}
            <div className="flex flex-col col-span-2">
              <label className="text-[15px] font-medium text-white mb-3">
                Profile Image URL
              </label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={formData.profileImage}
                onChange={(e) => handleChange("profileImage", e.target.value)}
                className="px-4 py-3 rounded-full text-white border border-white bg-transparent placeholder-white/70"
              />
            </div>
          </div>

          {/* Signup Button */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full mt-6 bg-white text-purple-700 py-3 rounded-full poppins font-bold text-lg hover:bg-purple-100 transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Footer */}
          <div className="text-center mt-6">
            <span className="text-white text-base text-[16px] poppins font-medium">
              Already have an account?
            </span>
            <button
              onClick={() => router.push("/login")}
              className="text-white text-base poppins font-bold ml-1 hover:opacity-80 transition-opacity underline cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
