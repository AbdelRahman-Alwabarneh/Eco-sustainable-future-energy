"use client";
import React, { useState } from "react";
import AdminDashboardLayout from "@/app/components/AdminDashboardLayout";
import axios from "axios";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: 0,
    ecoBenefits: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/products/create",
        formData,
        {
          withCredentials: true,
        }
      );
      setSuccessMessage(response.data.message);
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: 0,
        ecoBenefits: "",
      });
    } catch (error) {
      console.error("Error creating product:", error);
      setError("Failed to create product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="flex-1 overflow-hidden p-6 bg-[#1a1a1a]">
        <h1 className="text-3xl font-bold text-[#FFD700] mb-6">
          Create New Product
        </h1>
        {successMessage && (
          <div className="text-green-500">{successMessage}</div>
        )}
        {error && <div className="text-red-500">{error}</div>}
        <form onSubmit={handleSubmit} className="bg-[#2a2a2a] p-6 rounded-lg">
          <div className="mb-4">
            <label className="block text-white mb-2">Product Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 bg-[#3a3a3a] text-white border border-[#FFD700] rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-2 bg-[#3a3a3a] text-white border border-[#FFD700] rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full p-2 bg-[#3a3a3a] text-white border border-[#FFD700] rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Category:</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 bg-[#3a3a3a] text-white border border-[#FFD700] rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Stock:</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full p-2 bg-[#3a3a3a] text-white border border-[#FFD700] rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Eco Benefits:</label>
            <input
              type="text"
              name="ecoBenefits"
              value={formData.ecoBenefits}
              onChange={handleChange}
              className="w-full p-2 bg-[#3a3a3a] text-white border border-[#FFD700] rounded"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-[#FFD700] text-black px-4 py-2 rounded-lg"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </AdminDashboardLayout>
  );
};

export default CreateProduct;
