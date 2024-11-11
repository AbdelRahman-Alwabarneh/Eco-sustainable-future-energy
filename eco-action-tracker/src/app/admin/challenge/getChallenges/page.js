"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminDashboardLayout from "@/app/components/AdminDashboardLayout";
import { Calendar } from "lucide-react"; // Icon for date

const ChallengesPage = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchChallenges();
  }, [currentPage]);

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/admin/challenge?page=${currentPage}&limit=3`,
        {
          withCredentials: true,
        }
      );
      setChallenges(response.data.challenges);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching challenges:", error);
      setError("Failed to fetch challenges.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/admin/challenge/delete/${id}`);
      fetchChallenges(); // Refresh the challenges list
    } catch (error) {
      console.error("Error deleting challenge:", error);
    }
  };

  const handleEdit = (challenge) => {
    // Redirect to the edit page or open an edit modal
    // You can change this to your desired editing mechanism
    window.location.href = `/admin/challenge/edit/${challenge._id}`;
  };

  return (
    <AdminDashboardLayout>
      <div className="flex-1 overflow-hidden">
        <div className="h-screen overflow-y-auto bg-[#1a1a1a]">
          <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-[#FFD700] mb-6">
              Challenges ({challenges.length})
            </h1>

            {loading ? (
              <div className="text-center py-8 text-[#FFD700]">Loading...</div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">{error}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
                {challenges.map((challenge) => (
                  <div
                    key={challenge._id}
                    className="bg-[#2a2a2a] rounded-xl overflow-hidden border-2 border-[#FFD700] hover:shadow-[0_0_15px_rgba(255,215,0,0.3)] transition-all duration-300"
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white">
                        {challenge.title}
                      </h3>
                      {challenge.thumbnail && (
                        <img
                          src={challenge.thumbnail}
                          alt="Challenge Thumbnail"
                          className="mt-2 rounded-md"
                        />
                      )}
                      <div className="text-sm text-gray-400 flex items-center mt-2">
                        <Calendar size={14} className="mr-2 text-[#FFD700]" />
                        Name: {formatDate(challenge.title)}
                      </div>
                      <div className="text-sm text-gray-400 flex items-center mt-2">
                        <Calendar size={14} className="mr-2 text-[#FFD700]" />
                        Start: {formatDate(challenge.startDate)}
                      </div>
                      <div className="text-sm text-gray-400 flex items-center mt-2">
                        <Calendar size={14} className="mr-2 text-[#FFD700]" />
                        End: {formatDate(challenge.endDate)}
                      </div>
                      <div className="mt-2 text-sm text-gray-300">
                        Progress: {challenge.progress}%
                      </div>
                      <div className="flex justify-between mt-4">
                        <button
                          onClick={() => handleEdit(challenge)}
                          className="bg-[#FFD700] text-black px-4 py-2 rounded-lg"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(challenge._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-center mt-4">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
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
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default ChallengesPage;
