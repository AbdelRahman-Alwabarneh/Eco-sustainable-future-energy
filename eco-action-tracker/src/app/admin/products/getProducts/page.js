// src/app/admin/products/getProducts/page.js
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminDashboardLayout from "@/app/components/AdminDashboardLayout";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/admin/products/getProducts",
        { withCredentials: true }
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    window.location.href = `/admin/products/edit/${product._id}`;
  };

  return (
    <AdminDashboardLayout>
      <div className="flex-1 overflow-hidden">
        <div className="h-screen overflow-y-auto bg-[#1a1a1a]">
          <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-[#FFD700] mb-6">
              Products ({products.length})
            </h1>

            {loading ? (
              <div className="text-center py-8 text-[#FFD700]">Loading...</div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">{error}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-[#2a2a2a] rounded-xl overflow-hidden border-2 border-[#FFD700] hover:shadow-[0_0_15px_rgba(255,215,0,0.3)] transition-all duration-300"
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-gray-300">
                        {product.description}
                      </p>
                      <div className="mt-2 text-sm text-gray-400">
                        Price: ${product.price}
                      </div>
                      <div className="mt-2 text-sm text-gray-400">
                        Category: {product.category}
                      </div>
                      <div className="mt-2 text-sm text-gray-400">
                        Stock: {product.stock}
                      </div>
                      <div className="mt-2 text-sm text-gray-400">
                        Eco Benefits: {product.ecoBenefits}
                      </div>
                      <button
                        className="mt-4 bg-[#FFD700] text-black px-4 py-2 rounded-lg"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default ProductsPage;
