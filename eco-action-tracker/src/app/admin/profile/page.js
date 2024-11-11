"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminDashboardLayout from "@/app/components/AdminDashboardLayout";
import axios from "axios";

function AdminProfile() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get("/api/admin/profile", {
        withCredentials: true, // Important: This ensures cookies are sent
      });
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      if (error.response?.status === 401) {
        router.push("/login");
      } else {
        alert("Failed to fetch profile. Please try again.");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:3000/api/admin/profile",
        {
          firstName: profile.firstName,
          lastName: profile.lastName,
        },
        {
          withCredentials: true,
        }
      );
      setIsEditing(false);
      setProfile(response.data);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response?.status === 401) {
        router.push("/login");
      } else {
        alert("Failed to update profile. Please try again.");
      }
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-[#2D3134] mb-6">
          Admin Profile
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-[#2D3134]"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={profile.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8B7500] focus:ring focus:ring-[#8B7500] focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-[#2D3134]"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={profile.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8B7500] focus:ring focus:ring-[#8B7500] focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#2D3134]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={profile.email}
              disabled
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
            />
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-[#2D3134]"
            >
              Role
            </label>
            <input
              type="text"
              id="role"
              value={profile.role}
              disabled
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
            />
          </div>
          {isEditing ? (
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 text-[#2D3134] rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#8B7500] text-white rounded-md hover:bg-[#665600] transition-colors"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-[#8B7500] text-white rounded-md hover:bg-[#665600] transition-colors"
            >
              Edit Profile
            </button>
          )}
        </form>
      </div>
    </AdminDashboardLayout>
  );
}

export default AdminProfile;
