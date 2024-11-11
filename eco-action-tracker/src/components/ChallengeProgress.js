"use client";

import React, { useState, useEffect } from "react";
import {
  Battery,
  Bike,
  Leaf,
  QrCode,
  BarChart,
  Search,
  Calendar,
  Users,
  Sun,
  Moon,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Transition } from "@headlessui/react";

const ChallengesPage = () => {
  const [currentEnergy, setCurrentEnergy] = useState(0);
  const [totalEnergy, setTotalEnergy] = useState(0);
  const [co2Reduction, setCo2Reduction] = useState(0);
  const [challengeProgress, setChallengeProgress] = useState(0);
  const [showQRModal, setShowQRModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Global");
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  const [chartData, setChartData] = useState([
    { name: "Mon", energy: 40 },
    { name: "Tue", energy: 30 },
    { name: "Wed", energy: 60 },
    { name: "Thu", energy: 45 },
    { name: "Fri", energy: 70 },
    { name: "Sat", energy: 55 },
    { name: "Sun", energy: 80 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEnergy((prev) => {
        const newEnergy = prev + Math.random() * 0.1;
        setTotalEnergy((total) => total + newEnergy);
        setCo2Reduction((co2) => co2 + newEnergy * 0.5);
        setChallengeProgress((progress) =>
          Math.min(progress + newEnergy / 100, 100)
        );
        return newEnergy;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(false); // Data has been "loaded"
      setCurrentEnergy((prev) => {
        const newEnergy = prev + Math.random() * 0.1;
        setTotalEnergy((total) => total + newEnergy);
        setCo2Reduction((co2) => co2 + newEnergy * 0.5);
        setChallengeProgress((progress) =>
          Math.min(progress + newEnergy / 100, 100)
        );
        return newEnergy;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleQRScan = () => {
    setShowQRModal(true);
    setTimeout(() => {
      setShowQRModal(false);
      setCurrentEnergy((prev) => prev + 5);
      setTotalEnergy((total) => total + 5);
      setCo2Reduction((co2) => co2 + 2.5);
      setChallengeProgress((progress) => Math.min(progress + 5, 100));
    }, 3000);
  };

  const Spinner = () => (
    <div className="flex justify-center items-center">
      <div className="w-16 h-16 border-4 border-green-500 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      {loading ? (
        <Spinner /> // Show spinner while loading
      ) : (
        <div className={`${darkMode ? "dark" : ""}`}>
          <div className="bg-gradient-to-br from-green-100 to-blue-50 dark:from-gray-800 dark:to-gray-900 min-h-screen p-8 transition-colors duration-500">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-center mb-12">
              <h1 className="text-4xl font-bold text-green-800 dark:text-green-300">
                Energy Generation Tracker
              </h1>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-full bg-green-200 dark:bg-gray-700 transition-colors duration-300"
                  aria-label="Toggle Dark Mode"
                >
                  {darkMode ? (
                    <Sun className="w-6 h-6 text-yellow-400" />
                  ) : (
                    <Moon className="w-6 h-6 text-gray-800" />
                  )}
                </button>
                <img
                  src="/api/placeholder/40/40"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-green-700 dark:text-green-300 font-semibold">
                  John Doe
                </span>
              </div>
            </header>

            {/* Search Bar */}
            <div className="flex justify-between items-center mb-12">
              <div className="relative w-full max-w-xl">
                <Search className="absolute left-4 top-3 text-green-600 dark:text-green-300 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for energy-saving tips or challenges..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3 pl-12 pr-4 border border-green-300 dark:border-green-700 bg-white dark:bg-gray-800 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-400 text-gray-800 dark:text-gray-200 transition-colors duration-300"
                />
              </div>
            </div>

            {/* Global Challenges and Tips */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-green-800 dark:text-green-300 mb-6">
                Global Energy Challenges
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Current Challenge */}
                <div className="col-span-3 bg-gradient-to-r from-green-500 to-green-700 dark:from-green-600 dark:to-green-800 text-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                  <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 bg-white bg-opacity-20 dark:bg-opacity-10 rounded-full flex items-center justify-center">
                      <Leaf className="h-16 w-16 text-green-300 dark:text-green-500" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">
                        Global Challenge: Generate 100,000 kWh
                      </h2>
                      <p className="text-lg opacity-90">
                        Help power the world with clean energy!
                      </p>
                      <div className="mt-4">
                        <div className="w-full bg-white bg-opacity-20 dark:bg-opacity-10 rounded-full h-2">
                          <div
                            className="bg-white dark:bg-green-300 h-2 rounded-full transition-all duration-500"
                            style={{ width: "70%" }}
                          ></div>
                        </div>
                        <p className="text-sm mt-1">70% Complete</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* test islam */}
                {/* Quick Stats */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                  <h3 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-4">
                    Quick Stats
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-green-600 dark:text-green-400">
                        kWh Generated
                      </span>
                      <span className="text-2xl font-bold text-green-800 dark:text-green-300">
                        70,000
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-600 dark:text-green-400">
                        CO2 Reduction (kg)
                      </span>
                      <span className="text-2xl font-bold text-green-800 dark:text-green-300">
                        35,000
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-600 dark:text-green-400">
                        Days Left
                      </span>
                      <span className="text-2xl font-bold text-green-800 dark:text-green-300">
                        20
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Energy Tips */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex flex-col">
                  <img
                    src="/api/placeholder/300/200"
                    alt="Energy tip"
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold text-green-800 dark:text-green-300">
                    Top 5 Energy-Saving Tips
                  </h3>
                  <p className="text-green-600 dark:text-green-400 mt-2 flex-grow">
                    Learn how small actions can make a big impact on energy
                    efficiency!
                  </p>
                  <div className="flex items-center mt-4 text-green-500">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm">2.4k readers</span>
                  </div>
                </div>

                <div className="col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                  <h3 className="text-xl font-semibold text-green-800 dark:text-green-300">
                    Upcoming Events
                  </h3>
                  <div className="space-y-4 mt-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex items-center space-x-4 p-4 bg-green-50 dark:bg-gray-700 rounded-lg transition-colors duration-300"
                      >
                        <Calendar className="w-10 h-10 text-green-500 dark:text-green-300" />
                        <div>
                          <h4 className="font-semibold text-green-800 dark:text-green-300">
                            Renewable Energy Workshop {i}
                          </h4>
                          <p className="text-sm text-green-600 dark:text-green-400">
                            July {12 + i}, 2024 | Energy Park
                          </p>
                        </div>
                        <button className="ml-auto py-1 px-3 border border-green-500 dark:border-green-300 text-green-500 dark:text-green-300 rounded-lg hover:bg-green-500 hover:text-white dark:hover:bg-green-600 transition-colors duration-300">
                          Join
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* User Dashboard */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-green-800 dark:text-green-300 mb-6">
                Your Energy Progress
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
                  <h2 className="text-2xl font-semibold mb-4 text-green-700 dark:text-green-300 flex items-center">
                    <Battery className="mr-2" /> Current Energy Generation
                  </h2>
                  <p className="text-4xl font-bold text-green-800 dark:text-green-300 mb-2">
                    {currentEnergy.toFixed(2)} kWh
                  </p>
                  <p className="text-lg mb-2">
                    Total Energy Generated:{" "}
                    <span className="font-semibold">
                      {totalEnergy.toFixed(2)} kWh
                    </span>
                  </p>
                  <p className="text-lg">
                    CO2 Reduction:{" "}
                    <span className="font-semibold">
                      {co2Reduction.toFixed(2)} kg
                    </span>
                  </p>
                </div>

                {/* QR Code Section */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
                  <h2 className="text-2xl font-semibold mb-4 text-green-700 dark:text-green-300 flex items-center">
                    <QrCode className="mr-2" /> Scan QR Code to Contribute
                  </h2>
                  <button
                    className="bg-green-500 dark:bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-600 dark:hover:bg-green-700 transition-all duration-300"
                    onClick={handleQRScan}
                  >
                    Scan QR Code
                  </button>
                  {showQRModal && (
                    <Transition
                      show={showQRModal}
                      enter="transition-opacity duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition-opacity duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                          <h3 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-4">
                            Scanning...
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300">
                            Calculating your energy contribution. Please wait.
                          </p>
                          <div className="mt-4">
                            <div className="loader ease-linear rounded-full border-4 border-t-4 border-green-500 dark:border-green-300 h-12 w-12 mx-auto"></div>
                          </div>
                        </div>
                      </div>
                    </Transition>
                  )}
                </div>
              </div>
            </section>

            {/* Graph Section */}
            <section className="my-12">
              <h2 className="text-3xl font-bold text-green-800 dark:text-green-300 mb-6">
                Energy Generation Over Time
              </h2>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={chartData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={darkMode ? "#444" : "#ccc"}
                    />
                    <XAxis
                      dataKey="name"
                      stroke={darkMode ? "#fff" : "#333"}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      stroke={darkMode ? "#fff" : "#333"}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode ? "#2d3748" : "#fff",
                        border: "none",
                        borderRadius: "8px",
                      }}
                      labelStyle={{
                        color: darkMode ? "#fff" : "#333",
                      }}
                      itemStyle={{
                        color: darkMode ? "#fff" : "#333",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="energy"
                      stroke="#82ca9d"
                      strokeWidth={3}
                      dot={{ r: 5 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* Loader Styles */}
            <style jsx>{`
              .loader {
                border-top-color: transparent;
                animation: spin 1s linear infinite;
              }

              @keyframes spin {
                to {
                  transform: rotate(360deg);
                }
              }
            `}</style>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengesPage;
