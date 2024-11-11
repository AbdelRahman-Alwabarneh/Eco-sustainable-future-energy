"use client";
import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import AdminDashboardLayout from "../components/AdminDashboardLayout";

// Registering Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function AdminDashboard() {
  // Color scheme
  const darkYellow = "rgba(255, 215, 0, 0.8)";
  const lightYellow = "rgba(255, 215, 0, 0.4)";
  const black = "rgba(0, 0, 0, 0.8)";

  // Sample data for the Sales Overview chart
  const salesData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55, 40, 75, 92, 68, 78, 95],
        backgroundColor: darkYellow,
        borderColor: black,
        borderWidth: 2,
      },
    ],
  };

  // Chart options for Sales Overview
  const salesOptions = {
    responsive: true,
    animation: {
      duration: 2000,
      easing: "easeOutBounce",
    },
    plugins: {
      legend: {
        position: "top",
        labels: { color: black },
      },
      title: {
        display: true,
        text: "Sales Overview",
        color: black,
        font: { size: 20 },
      },
    },
    scales: {
      x: {
        ticks: { color: black },
        grid: { color: "rgba(0, 0, 0, 0.1)" },
      },
      y: {
        ticks: { color: black },
        grid: { color: "rgba(0, 0, 0, 0.1)" },
      },
    },
  };

  // Sample data for Recent Activity chart (Line Chart)
  const activityData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "User Registrations",
        data: [30, 40, 50, 70],
        borderColor: darkYellow,
        backgroundColor: lightYellow,
        fill: true,
        tension: 0.4,
      },
      {
        label: "Active Users",
        data: [20, 35, 45, 60],
        borderColor: black,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Chart options for Recent Activity
  const activityOptions = {
    responsive: true,
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
    },
    plugins: {
      legend: {
        position: "top",
        labels: { color: black },
      },
      title: {
        display: true,
        text: "User Activity",
        color: black,
        font: { size: 20 },
      },
    },
    scales: {
      x: {
        ticks: { color: black },
        grid: { color: "rgba(0, 0, 0, 0.1)" },
      },
      y: {
        ticks: { color: black },
        grid: { color: "rgba(0, 0, 0, 0.1)" },
      },
    },
  };

  // Sample data for Quick Stats chart (Bar Chart)
  const quickStatsData = {
    labels: ["Products", "Users", "Orders", "Revenue ($K)"],
    datasets: [
      {
        label: "Current Month",
        data: [120, 200, 75, 300],
        backgroundColor: darkYellow,
      },
      {
        label: "Previous Month",
        data: [100, 180, 60, 250],
        backgroundColor: black,
      },
    ],
  };

  // Chart options for Quick Stats
  const quickStatsOptions = {
    responsive: true,
    animation: {
      duration: 1500,
      easing: "easeInOutCubic",
    },
    plugins: {
      legend: {
        position: "top",
        labels: { color: black },
      },
      title: {
        display: true,
        text: "Quick Stats Comparison",
        color: black,
        font: { size: 20 },
      },
    },
    scales: {
      x: {
        ticks: { color: black },
        grid: { color: "rgba(0, 0, 0, 0.1)" },
      },
      y: {
        ticks: { color: black },
        grid: { color: "rgba(0, 0, 0, 0.1)" },
      },
    },
  };

  return (
    <AdminDashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-100 rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-black mb-4">
            Welcome, Admin!
          </h1>
        
        </div>

        {/* Chart Section: Sales Overview */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-black">
            Sales Overview
          </h2>
          <Bar data={salesData} options={salesOptions} />
        </div>

        {/* Chart Section: Recent Activity */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-black">
            User Activity
          </h2>
          <Line data={activityData} options={activityOptions} />
        </div>

        {/* Chart Section: Quick Stats */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-black">
            Quick Stats Comparison
          </h2>
          <Bar data={quickStatsData} options={quickStatsOptions} />
        </div>
      </div>
    </AdminDashboardLayout>
  );
}

export default AdminDashboard;
