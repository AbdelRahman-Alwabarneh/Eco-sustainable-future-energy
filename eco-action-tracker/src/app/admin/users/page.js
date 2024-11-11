"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminDashboardLayout from "@/app/components/AdminDashboardLayout";
import {
  Search,
  User as UserIcon,
  Mail,
  Award,
  Leaf,
  Calendar,
} from "lucide-react";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchTerm]); // Add currentPage and searchTerm to the dependency array

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/admin/users?page=${currentPage}&limit=3&search=${searchTerm}`,
        {
          withCredentials: true,
        }
      );
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to the first page on search
    fetchUsers();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleBlockUser = async (userId) => {
    try {
      await axios.put(
        `http://localhost:3000/api/admin/users/${userId}`,
        {},
        { withCredentials: true }
      );
      alert("User blocked successfully.");
      fetchUsers(); // Refresh the user list after blocking a user
    } catch (error) {
      console.error("Error blocking user:", error);
      alert("Failed to block user.");
    }
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <AdminDashboardLayout>
      <div className="flex-1 overflow-hidden">
        <div className="h-screen overflow-y-auto bg-[#1a1a1a]">
          <div className="max-w-7xl mx-auto p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-[#FFD700] mb-4 md:mb-0">
                Platform Users ({users.length})
              </h1>

              <form onSubmit={handleSearch} className="w-full md:w-64">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 pl-10 rounded-lg bg-[#2a2a2a] text-white border-2 border-[#FFD700] focus:outline-none"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-[#FFD700]" />
                </div>
              </form>
            </div>

            {loading ? (
              <div className="text-center py-8 text-[#FFD700]">Loading...</div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">{error}</div>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
                  {users.map((user) => (
                    <div
                      key={user._id}
                      className="bg-[#2a2a2a] rounded-xl overflow-hidden border-2 border-[#FFD700] hover:shadow-[0_0_15px_rgba(255,215,0,0.3)] transition-all duration-300"
                    >
                      <div className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="h-16 w-16 rounded-full bg-[#3a3a3a] flex items-center justify-center border-2 border-[#FFD700]">
                            <UserIcon size={32} className="text-[#FFD700]" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white">
                              {user.firstName} {user.lastName}
                            </h3>
                            <div className="flex items-center text-gray-300 text-sm">
                              <Mail size={14} className="mr-2 text-[#FFD700]" />
                              {user.email}
                            </div>
                          </div>
                        </div>
                        <div className="mb-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              user.role === "admin"
                                ? "bg-[#FFD700] text-black"
                                : "bg-[#3a3a3a] text-[#FFD700] border border-[#FFD700]"
                            }`}
                          >
                            {user.role}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="bg-[#3a3a3a] p-3 rounded-lg text-center">
                            <Award className="h-5 w-5 text-[#FFD700] mx-auto mb-1" />
                            <p className="text-sm text-gray-300">Points</p>
                            <p className="text-lg font-bold text-white">
                              {user.points}
                            </p>
                          </div>
                          <div className="bg-[#3a3a3a] p-3 rounded-lg text-center">
                            <Leaf className="h-5 w-5 text-[#FFD700] mx-auto mb-1" />
                            <p className="text-sm text-gray-300">CO₂ Reduced</p>
                            <p className="text-lg font-bold text-white">
                              {user.totalCO2Reduction}kg
                            </p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-400 flex items-center">
                          <Calendar size={14} className="mr-2 text-[#FFD700]" />
                          Joined: {formatDate(user.createdAt)}
                        </div>
                        {user.currentChallenges.length > 0 && (
                          <div className="mt-3 bg-[#3a3a3a] px-3 py-2 rounded-lg">
                            <p className="text-sm text-[#FFD700]">
                              Active Challenges: {user.currentChallenges.length}
                            </p>
                          </div>
                        )}
                        {/* Block User Button */}
                        <button
                          onClick={() => handleBlockUser(user._id)}
                          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
                        >
                          Block
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Pagination Controls */}
                <div className="flex justify-center mt-4">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`mx-1 px-4 py-2 rounded-lg ${
                        currentPage === index + 1
                          ? "bg-[#FFD700] text-black"
                          : "bg-[#3a3a3a] text-[#FFD700]"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}

export default UsersPage;
