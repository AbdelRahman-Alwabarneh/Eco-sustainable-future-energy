// app/admin/posts/page.js
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminDashboardLayout from "@/app/components/AdminDashboardLayout";
import { Search, User as UserIcon, Mail, Calendar } from "lucide-react";

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingPost, setEditingPost] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/admin/posts?page=${currentPage}&limit=3`,
        {
          withCredentials: true,
        }
      );
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setEditContent(post.content);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/admin/posts/${editingPost._id}`,
        {
          content: editContent,
        }
      );
      fetchPosts(); // Refresh the posts list
      setEditingPost(null); // Close the edit form
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
            <h1 className="text-3xl font-bold text-[#FFD700] mb-6">
              Platform Posts ({posts.length})
            </h1>

            {loading ? (
              <div className="text-center py-8 text-[#FFD700]">Loading...</div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">{error}</div>
            ) : editingPost ? (
              <div className="bg-[#2a2a2a] rounded-xl p-6">
                <h3 className="text-xl font-bold text-white">Edit Post</h3>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="mt-2 w-full p-2 bg-[#3a3a3a] text-white rounded-md"
                />
                <button
                  onClick={handleSaveEdit}
                  className="mt-4 bg-[#FFD700] text-black px-4 py-2 rounded-lg"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingPost(null)}
                  className="mt-4 ml-2 bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
                  {posts.map((post) => (
                    <div
                      key={post._id}
                      className="bg-[#2a2a2a] rounded-xl overflow-hidden border-2 border-[#FFD700] hover:shadow-[0_0_15px_rgba(255,215,0,0.3)] transition-all duration-300"
                    >
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white">
                          {post.content}
                        </h3>
                        {post.image && (
                          <img
                            src={post.image}
                            alt="Post Image"
                            className="mt-2 rounded-md"
                          />
                        )}
                        <div className="text-sm text-gray-400 flex items-center mt-2">
                          <Calendar size={14} className="mr-2 text-[#FFD700]" />
                          Posted on: {formatDate(post.time)}
                        </div>
                        <div className="mt-2 text-sm text-gray-300">
                          Likes: {post.likes}
                        </div>
                        <button
                          onClick={() => handleEdit(post)}
                          className="mt-4 bg-[#FFD700] text-black px-4 py-2 rounded-lg"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
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

export default PostsPage;
