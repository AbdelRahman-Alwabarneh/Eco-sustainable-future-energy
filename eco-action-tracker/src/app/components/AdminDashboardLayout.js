"use client";
import React from "react";
import Sidebar from "./Sidebar"; // Adjust the import path as needed

const AdminDashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FAF8ED] pt-16">
      <div className="fixed inset-y-16 left-0 z-30">
        <Sidebar />
      </div>
      <div className="pl-64">
        <main className="w-full min-h-[calc(100vh-4rem)]">{children}</main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
