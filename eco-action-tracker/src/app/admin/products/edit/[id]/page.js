// src/app/admin/products/edit/[id]/page.js
"use client"; // Make this a Client Component

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use 'next/navigation'
import axios from "axios";
import AdminDashboardLayout from "@/app/components/AdminDashboardLayout";

const EditProductPage = ({ params }) => {
  // Get params from props
  const router = useRouter();
  const { id } = params; // Destructure id from params
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/admin/products/getProducts/${id}`,
        { withCredentials: true }
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Failed to fetch product.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/api/admin/products/edit/${id}`,
        product
      );
      router.push("/admin/products/getProducts"); // Redirect after editing
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Failed to update product.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <AdminDashboardLayout>
      <div className="max-w-lg mx-auto p-6 bg-[#1a1a1a] rounded-lg">
        <h1 className="text-3xl font-bold text-[#FFD700] mb-4">Edit Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full p-2 bg-[#2a2a2a] text-white border border-[#FFD700] rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full p-2 bg-[#2a2a2a] text-white border border-[#FFD700] rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full p-2 bg-[#2a2a2a] text-white border border-[#FFD700] rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="category">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full p-2 bg-[#2a2a2a] text-white border border-[#FFD700] rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="stock">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              className="w-full p-2 bg-[#2a2a2a] text-white border border-[#FFD700] rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="ecoBenefits">
              Eco Benefits
            </label>
            <input
              type="text"
              id="ecoBenefits"
              name="ecoBenefits"
              value={product.ecoBenefits}
              onChange={handleChange}
              className="w-full p-2 bg-[#2a2a2a] text-white border border-[#FFD700] rounded"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-[#FFD700] text-black px-4 py-2 rounded-lg"
          >
            Update Product
          </button>
        </form>
      </div>
    </AdminDashboardLayout>
  );
};

export default EditProductPage;
