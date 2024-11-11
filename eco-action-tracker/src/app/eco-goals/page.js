"use client";

import React, { useState, useEffect } from "react";
import {
  Target,
  PlusCircle,
  Edit,
  Trash2,
  Check,
  X,
  Battery,
  Bike,
  Zap,
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

const CustomAlert = ({ message }) => (
  <div className="mt-8 bg-blue-100 border-l-4 border-blue-500 p-4 rounded-r-lg shadow-md transition-all duration-300 hover:shadow-lg">
    <div className="flex items-center">
      <Battery className="h-5 w-5 mr-2 text-blue-500" />
      <p className="text-blue-700">{message}</p>
    </div>
  </div>
);

const EcoGoalManagementPage = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Generate 100 kWh by biking",
      target: 100,
      progress: 35,
      dueDate: "2024-11-01",
    },
    {
      id: 2,
      title: "Reduce CO2 by 50kg",
      target: 50,
      progress: 20,
      dueDate: "2024-10-15",
    },
  ]);
  const [newGoal, setNewGoal] = useState({
    title: "",
    target: "",
    dueDate: "",
  });
  const [editingGoal, setEditingGoal] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [motivationalMessage, setMotivationalMessage] = useState("");

  const motivationalMessages = [
    "Great job! You're making a real difference.",
    "Keep pedaling towards a greener future!",
    "Your efforts are lighting up the world, literally!",
    "Every kilowatt-hour counts. You're doing amazing!",
    "You're not just exercising, you're powering the planet!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessage =
        motivationalMessages[
          Math.floor(Math.random() * motivationalMessages.length)
        ];
      setMotivationalMessage(randomMessage);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.target && newGoal.dueDate) {
      setGoals([...goals, { ...newGoal, id: Date.now(), progress: 0 }]);
      setNewGoal({ title: "", target: "", dueDate: "" });
    }
  };

  const handleEditGoal = (goal) => {
    setEditingGoal(goal);
  };

  const handleUpdateGoal = () => {
    setGoals(goals.map((g) => (g.id === editingGoal.id ? editingGoal : g)));
    setEditingGoal(null);
  };

  const handleDeleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const handleQRScan = () => {
    setShowQRModal(true);
    setTimeout(() => {
      setShowQRModal(false);
      // Simulate logging action and updating progress
      setGoals(
        goals.map((goal) => ({
          ...goal,
          progress: Math.min(goal.progress + Math.random() * 10, goal.target),
        }))
      );
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 p-8 mt-[10rem] ">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">
          Eco-Goal Management
        </h1>
        <p className="text-xl text-blue-600">
          Set, Track, and Achieve Your Energy-Saving Goals
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700 flex items-center">
            <Target className="mr-2" /> Your Eco-Goals
          </h2>
          {goals.map((goal) => (
            <div key={goal.id} className="mb-4 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold">{goal.title}</h3>
              <p>
                Target: {goal.target} kWh | Due: {goal.dueDate}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 my-2">
                <div
                  className="bg-green-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                ></div>
              </div>
              <p className="text-right text-green-600 font-semibold">
                {((goal.progress / goal.target) * 100).toFixed(2)}% Complete
              </p>
              <div className="mt-2 flex justify-end space-x-2">
                <button
                  onClick={() => handleEditGoal(goal)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => handleDeleteGoal(goal.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700 flex items-center">
            <PlusCircle className="mr-2" /> Add New Goal
          </h2>
          <input
            type="text"
            placeholder="Goal Title"
            value={newGoal.title}
            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="number"
            placeholder="Target (kWh)"
            value={newGoal.target}
            onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="date"
            value={newGoal.dueDate}
            onChange={(e) =>
              setNewGoal({ ...newGoal, dueDate: e.target.value })
            }
            className="w-full p-2 mb-2 border rounded"
          />
          <button
            onClick={handleAddGoal}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Add Goal
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700 flex items-center">
            <Zap className="mr-2" /> Your Progress Overview
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={goals}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="progress"
                stroke="#3B82F6"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="#10B981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="fixed bottom-8 right-8">
        <button
          onClick={handleQRScan}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center"
        >
          <Bike className="mr-2" /> Log Bike Action
        </button>
      </div>

      {showQRModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Scanning QR Code...</h3>
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-blue-400 h-12 w-12"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-blue-400 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-blue-400 rounded"></div>
                  <div className="h-4 bg-blue-400 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {editingGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Edit Goal</h3>
            <input
              type="text"
              value={editingGoal.title}
              onChange={(e) =>
                setEditingGoal({ ...editingGoal, title: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="number"
              value={editingGoal.target}
              onChange={(e) =>
                setEditingGoal({ ...editingGoal, target: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="date"
              value={editingGoal.dueDate}
              onChange={(e) =>
                setEditingGoal({ ...editingGoal, dueDate: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleUpdateGoal}
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                <Check size={20} />
              </button>
              <button
                onClick={() => setEditingGoal(null)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      <CustomAlert message={motivationalMessage} />

      <footer className="mt-12 text-center text-blue-700">
        <p>&copy; 2024 Eco-Goal Management. All rights reserved.</p>
        <p className="mt-2 flex items-center justify-center">
          <Zap className="mr-2" /> Every pedal brings us closer to a sustainable
          future!
        </p>
      </footer>
    </div>
  );
};

export default EcoGoalManagementPage;
