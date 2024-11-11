"use client";
import React, { useState } from "react";
import axios from "axios";
import AdminDashboardLayout from "@/app/components/AdminDashboardLayout";

function CreateChallengePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetEnergy, setTargetEnergy] = useState("");
  const [currentEnergy, setCurrentEnergy] = useState(0);
  const [progress, setProgress] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [startHour, setStartHour] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endHour, setEndHour] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [status, setStatus] = useState("upcoming");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/challenge/create",
        {
          title,
          description,
          targetEnergy: Number(targetEnergy),
          currentEnergy,
          progress,
          startDate,
          startHour,
          endDate,
          endHour,
          thumbnail,
          status,
          delete: false, // setting default delete flag to false
        },
        { withCredentials: true }
      );

      alert("Challenge created successfully!");
      // Optionally, you could redirect to another page or reset the form here
    } catch (error) {
      console.error("Error creating challenge:", error);
      alert("Failed to create challenge.");
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Create Challenge</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block mb-1">Target Energy</label>
            <input
              type="number"
              required
              value={targetEnergy}
              onChange={(e) => setTargetEnergy(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block mb-1">Current Energy</label>
            <input
              type="number"
              value={currentEnergy}
              onChange={(e) => setCurrentEnergy(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block mb-1">Progress</label>
            <input
              type="number"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block mb-1">Start Date</label>
            <input
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block mb-1">Start Hour</label>
            <input
              type="time"
              required
              value={startHour}
              onChange={(e) => setStartHour(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block mb-1">End Date</label>
            <input
              type="date"
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block mb-1">End Hour</label>
            <input
              type="time"
              required
              value={endHour}
              onChange={(e) => setEndHour(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block mb-1">Thumbnail URL</label>
            <input
              type="text"
              required
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            >
              <option value="upcoming">Upcoming</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create Challenge
          </button>
        </form>
      </div>
    </AdminDashboardLayout>
  );
}

export default CreateChallengePage;
