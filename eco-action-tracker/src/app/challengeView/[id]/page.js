"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Trophy,
  Zap,
  Calendar,
  Clock,
  Users,
  ChevronLeft,
  Flame,
  Award,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChallengeDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const [challenge, setChallenge] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [participants, setParticipants] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reminder, setReminder] = useState("");
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [bikes, setBikes] = useState([]);
  const [selectedBike, setSelectedBike] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    const fetchChallengeData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/challenges?id=${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch challenge data");
        }
        const data = await response.json();
        setChallenge(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallengeData();
  }, [id]);

  useEffect(() => {
    const fetchParticipants = async () => {
      const authToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];
      try {
        const response = await fetch(
          `http://localhost:3000/api/joiningChallenges?challengeId=${id}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const data = await response.json();
        setParticipants(data.count);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    fetchParticipants();
  }, [id]);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/bikes");
        if (!response.ok) {
          throw new Error("Failed to fetch bikes");
        }
        const data = await response.json();
        setBikes(data);
      } catch (error) {
        console.error("Error fetching bikes:", error);
      }
    };

    fetchBikes();
  }, []);

  const handleAddReminder = async () => {
    const authToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];

    try {
      const response = await fetch("http://localhost:3000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ reminder }),
      });

      if (!response.ok) {
        throw new Error("Failed to add reminder");
      }

      console.log("Reminder added successfully");
      toast.success("Reminder added successfully!");
    } catch (error) {
      console.error("Error adding reminder:", error);
      toast.error("Error adding reminder: " + error.message);
    } finally {
      setIsModalOpen(false);
      setReminder("");
    }
  };

  const fetchParticipants = async () => {
    const authToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];
    try {
      const response = await fetch(
        `http://localhost:3000/api/joiningChallenges?challengeId=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const data = await response.json();
      setParticipants(data.count);
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  const handleJoinChallenge = async () => {
    const authToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];

    const challengeId = params.id;

    try {
      const response = await fetch(
        "http://localhost:3000/api/joiningChallenges",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ challengeId, bikeId: selectedBike }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();
      console.log("Joined challenge successfully", data);
      toast.success("Joined challenge successfully!");
      setOrderNumber(`Order #${Math.floor(Math.random() * 10000)}`);

      await fetchParticipants();
    } catch (error) {
      console.error("Error joining challenge:", error);
      toast.error(error.message);
    } finally {
      setIsJoinModalOpen(false);
      setSelectedBike("");
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="mb-8">
          <button
            onClick={() => router.push("/challenges")}
            className="flex items-center text-orange-400 hover:text-orange-300 transition-colors duration-200"
          >
            <ChevronLeft className="mr-2" /> Back to Challenges
          </button>
        </div>

        <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="relative h-80">
            <img
              src={challenge?.thumbnail}
              alt={challenge?.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <h1 className="text-4xl font-bold text-white mb-2">
                {challenge?.title}
              </h1>
              <div className="flex items-center">
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {challenge?.status}
                </span>
                <span className="ml-4 flex items-center text-gray-300">
                  <Users className="mr-2" /> {participants} Participants
                </span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex justify-end space-x-4 mb-8">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200"
              >
                Add Reminder
              </button>
              <button
                onClick={() => setIsJoinModalOpen(true)}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Join Challenge
              </button>
            </div>

            <p className="text-gray-300 text-lg mb-8">
              {challenge?.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Trophy className="mr-2 text-orange-400" /> Progress
                </h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Completion</span>
                  <span className="text-lg font-bold text-orange-400">
                    {challenge?.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-orange-400 to-orange-600 h-4 rounded-full"
                    style={{ width: `${challenge?.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Zap className="mr-2 text-orange-400" /> Energy Savings
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Current / Target</span>
                  <span className="text-lg font-bold text-orange-400">
                    {challenge?.currentEnergy} / {challenge?.targetEnergy} kWh
                  </span>
                </div>
                <div className="mt-4 flex items-center">
                  <Flame className="text-orange-400 mr-2" />
                  <span className="text-gray-300">
                    {(
                      (challenge?.currentEnergy / challenge?.targetEnergy) *
                      100
                    ).toFixed(1)}
                    % of goal reached
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Calendar className="mr-2 text-orange-400" /> Timeline
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-300">
                    <span className="font-semibold">Start:</span>{" "}
                    {formatDate(challenge?.startDate)} at {challenge?.startHour}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-semibold">End:</span>{" "}
                    {formatDate(challenge?.endDate)} at {challenge?.endHour}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Award className="mr-2 text-orange-400" /> Rewards
                </h3>
                <ul className="list-disc list-inside text-gray-300">
                  <li>Energy-saving badge</li>
                  <li>100 eco-points</li>
                  <li>Entry into monthly prize draw</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Tips for Success</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Turn off lights when not in use</li>
                <li>Use energy-efficient appliances</li>
                <li>Adjust your thermostat by a few degrees</li>
                <li>Unplug devices that aren't in use</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-gray-800 rounded-lg p-6 w-96 mx-4 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Add Reminder</h2>
            <textarea
              value={reminder}
              onChange={(e) => setReminder(e.target.value)}
              placeholder="Enter your reminder here..."
              className="w-full p-2 mb-4 rounded-lg bg-gray-700 text-white resize-none"
              rows="4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddReminder}
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {isJoinModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-gray-800 rounded-lg p-6 w-96 mx-4 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Join Challenge</h2>
            <select
              value={selectedBike}
              onChange={(e) => setSelectedBike(e.target.value)}
              className="w-full p-2 mb-4 rounded-lg bg-gray-700 text-white"
            >
              <option value="">Select a Bike</option>
              {bikes.map((bike, index) => (
                <option key={bike.id} value={bike._id}>
                  {index + 1}. {bike.location}
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsJoinModalOpen(false)}
                className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleJoinChallenge}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Join
              </button>
            </div>
            {orderNumber && (
              <p className="mt-4 text-green-500 text-center">{orderNumber}</p>
            )}
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default ChallengeDetailsPage;
