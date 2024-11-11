'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Eye, EyeOff } from 'lucide-react';
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [newBannerPicture, setNewBannerPicture] = useState(null);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users", {
          withCredentials: true,
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/");
      }
    };

    fetchUserData();
  }, [pathname === "/profile"]);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewProfilePicture(file);
    }
  };

  const handleBannerPictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewBannerPicture(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSaveChanges = async () => {
    setError('');
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You're about to update your personal information.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    });

    if (result.isConfirmed) {
      const updatedData = {
        firstName: userData.firstName,
        lastName: userData.lastName
      };

      if (newPassword) {
        updatedData.password = newPassword;
      }

      try {
        const response = await axios.put("http://localhost:3000/api/users", updatedData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });

        setUserData(response.data);
        setIsEditing(false);
        setNewPassword('');
        setConfirmPassword('');
        Swal.fire(
          'Updated!',
          'Your profile has been updated successfully.',
          'success'
        );
      } catch (error) {
        console.error("Error saving changes:", error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to save changes. Please try again.',
        });
      }
    }
  };

  if (!userData) {
    return <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#2D3134] to-[#1A1D1F]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#FDB713]"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2D3134] to-[#1A1D1F] text-white p-2 sm:p-4 mt-[64px]">
      <div className="max-w-4xl mx-auto bg-[#FAF8ED]/10 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
        {/* Banner Image */}
        <div className="h-32 sm:h-48 bg-gradient-to-r from-[#ceae62] to-[#FDB713] relative group">
          {newBannerPicture && (
            <img src={URL.createObjectURL(newBannerPicture)} alt="New Banner" className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <label htmlFor="banner-upload" className="cursor-pointer transform hover:scale-110 transition-transform duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </label>
            <input
              id="banner-upload"
              type="file"
              className="hidden"
              onChange={handleBannerPictureChange}
              accept="image/*"
            />
          </div>
        </div>

        {/* Profile Picture and Edit Button */}
        <div className="relative px-4 flex flex-col sm:flex-row sm:justify-between sm:items-end">
          <div className="relative inline-block -mt-16 sm:-mt-20 mb-4 sm:mb-0">
            <img
              src={newProfilePicture ? URL.createObjectURL(newProfilePicture) : (userData.picture || "https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png")}
              alt="Profile Picture"
              className="w-24 h-24 sm:w-32 bg-white sm:h-32 rounded-full border-2 border-[#FAF8ED] object-cover shadow-md"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <label htmlFor="profile-upload" className="cursor-pointer transform hover:scale-110 transition-transform duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </label>
              <input
                id="profile-upload"
                type="file"
                className="hidden"
                onChange={handleProfilePictureChange}
                accept="image/*"
              />
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-[#FDB713] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:bg-[#ceae62] transition-colors duration-200 sm:self-end"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {/* User Info */}
        <div className="px-4 py-4">
          <div className="flex flex-col mb-4">
            <div className="mb-2 sm:mb-0">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleInputChange}
                    className="text-xl sm:text-2xl font-bold text-[#FDB713] bg-transparent border-b border-[#FDB713] mb-1 w-full focus:outline-none"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleInputChange}
                    className="text-xl mt-2 sm:text-2xl font-bold text-[#FDB713] bg-transparent border-b border-[#FDB713] mb-1 w-full focus:outline-none"
                  />
                  <input
                    type="email"
                    name="email"
                    readOnly
                    value={userData.email}
                    onChange={handleInputChange}
                    className="text-sm mt-2 text-[#FAF8ED]/80 bg-transparent border-b border-[#FAF8ED]/80 w-full focus:outline-none"
                  />
                </>
              ) : (
                <>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#FDB713]">
                    {userData.firstName} {userData.lastName}
                  </h1>
                  <p className="text-[#FAF8ED]/80 text-sm">{userData.email}</p>
                </>
              )}
            </div>
          </div>

          {/* Password Change Form */}
          {isEditing && (
            <div className="mt-4 bg-[#FAF8ED]/5 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Change Password</h3>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 mb-2 rounded bg-[#FAF8ED]/20 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#FDB713] pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 bottom-2 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-300" /> : <Eye className="h-5 w-5 text-gray-300" />}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 mb-2 rounded bg-[#FAF8ED]/20 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#FDB713] pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 bottom-2 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-300" /> : <Eye className="h-5 w-5 text-gray-300" />}
                </button>
              </div>
            </div>
          )}
          {isEditing && (
            <button
              onClick={handleSaveChanges}
              className="mt-4 bg-[#4CAF50] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:bg-[#45a049] transition-colors duration-200"
            >
              Save Changes
            </button>
          )}
          {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}

          {/* Additional Info */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <InfoCard title="Total Points" value={userData.points} icon="🏆" />
            <InfoCard title="CO2 Reduction" value={`${userData.CO2Reduction} kg`} icon="🌿" />
            <InfoCard title="Energy Generated" value={`${userData.totalEnergyGenerated} kWh`} icon="⚡" />
            <InfoCard title="Role" value={userData.role} icon="👤" />
          </div>

          {/* Activity Log */}
          {/* <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Recent Activity</h2>
            {userData.activityLog && userData.activityLog.length > 0 ? (
              <ul className="space-y-2">
                {userData.activityLog.map((activity, index) => (
                  <li key={index} className="bg-[#FAF8ED]/5 p-3 rounded-md text-sm hover:bg-[#FAF8ED]/10 transition-colors duration-200">
                    <p className="text-[#FAF8ED]">{activity}</p>
                    <p className="text-[#FAF8ED]/60 text-xs mt-1">{new Date().toLocaleDateString()}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[#FAF8ED]/60 bg-[#FAF8ED]/5 p-3 rounded-md text-sm">No recent activity</p>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ title, value, icon }) => (
  <div className="bg-[#FAF8ED]/5 p-3 rounded-md hover:bg-[#FAF8ED]/10 transition-all duration-300 transform hover:scale-105">
    <div className="flex items-center mb-1">
      <span className="text-lg mr-2">{icon}</span>
      <h3 className="text-sm font-medium text-[#FAF8ED]/80">{title}</h3>
    </div>
    <p className="text-lg font-semibold text-[#FDB713]">{value}</p>
  </div>
);

export default ProfilePage;