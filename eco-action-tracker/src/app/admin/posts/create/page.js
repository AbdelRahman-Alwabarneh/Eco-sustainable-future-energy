"use client";
import React, { useState } from "react";
import axios from "axios";
import AdminDashboardLayout from "@/app/components/AdminDashboardLayout";

function CreatePostPage() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/posts",
        { content, image },
        { withCredentials: true }
      );

      setSuccess("Post created successfully!");
      setContent("");
      setImage("");
    } catch (error) {
      console.error("Error creating post:", error);
      setError("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-[#FFD700] mb-6">Create Post</h1>

        {loading && <div className="text-center py-8 text-[#FFD700]">Loading...</div>}
        {error && <div className="text-center py-8 text-red-500">{error}</div>}
        {success && <div className="text-center py-8 text-green-500">{success}</div>}

        <form onSubmit={handleSubmit} className="bg-[#2a2a2a] p-6 rounded-lg">
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="content">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-32 p-2 border-2 border-[#FFD700] rounded-lg bg-[#3a3a3a] text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="image">
              Image URL
            </label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-2 border-2 border-[#FFD700] rounded-lg bg-[#3a3a3a] text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#FFD700] text-black py-2 px-4 rounded-lg"
          >
            Create Post
          </button>
        </form>
      </div>
    </AdminDashboardLayout>
  );
}

export default CreatePostPage;
