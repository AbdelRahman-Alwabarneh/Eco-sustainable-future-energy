"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminDashboardLayout from "@/app/components/AdminDashboardLayout";

const EditChallengePage = ({ params }) => {
  const { id } = params; // Extracting the ID from the URL
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fetch the challenge details
    const fetchChallenge = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/admin/challenge/${id}`);
        setChallenge(response.data);
        setTitle(response.data.title);
        setThumbnail(response.data.thumbnail);
        setStartDate(response.data.startDate);
        setEndDate(response.data.endDate);
        setProgress(response.data.progress);
      } catch (error) {
        console.error("Error fetching challenge:", error);
        setError("Failed to fetch challenge.");
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/admin/challenge/update/${id}`, {
        title,
        thumbnail,
        startDate,
        endDate,
        progress,
      });
      // Optionally redirect back to the challenges page
      window.location.href = "/admin/challenge/getChallenges";
    } catch (error) {
      console.error("Error updating challenge:", error);
      setError("Failed to update challenge.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <AdminDashboardLayout>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Edit Challenge</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Thumbnail URL</label>
            <input
              type="text"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Progress (%)</label>
            <input
              type="number"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button type="submit" className="bg-[#FFD700] text-black px-4 py-2 rounded-lg">
            Save Changes
          </button>
        </form>
      </div>
    </AdminDashboardLayout>
  );
};

export default EditChallengePage;
