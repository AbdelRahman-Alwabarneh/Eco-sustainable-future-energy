"use client";

import React, { useState, useEffect, useCallback } from "react";
import { QRCode } from "react-qr-code";
import { motion, AnimatePresence } from "framer-motion";
import { Bike, ZapOff, RotateCcw, ChevronUp, ChevronDown } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const KineticEnergyQR = () => {
  const [kineticEnergy, setKineticEnergy] = useState(0);
  const [distance, setDistance] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [energyData, setEnergyData] = useState([]);
  const [currentSpeed, setCurrentSpeed] = useState(0);

  const mass = 70;
  const velocityIncrement = 0.1;

  const calculateKineticEnergy = useCallback((currentDistance) => {
    const velocity = velocityIncrement * (currentDistance / 10);
    setCurrentSpeed(velocity);
    return 0.5 * mass * velocity ** 2;
  }, []);

  const calculateDistance = (prevDistance) => {
    const distanceIncrement = 2;
    return prevDistance + distanceIncrement;
  };

  const resetReadings = () => {
    setKineticEnergy(0);
    setDistance(0);
    setIsRunning(false);
    setEnergyData([]);
    setCurrentSpeed(0);
    if (intervalId) clearInterval(intervalId);
  };

  const handleStart = () => setIsRunning(true);
  const handleStop = () => {
    setIsRunning(false);
    setTimeout(resetReadings, 60000);
  };
  const handleReset = resetReadings;

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setDistance((prevDistance) => {
          const newDistance = calculateDistance(prevDistance);
          const newEnergy = calculateKineticEnergy(newDistance);
          setKineticEnergy(newEnergy);
          setEnergyData((prevData) => [
            ...prevData,
            { time: prevData.length, energy: newEnergy },
          ]);
          return newDistance;
        });
      }, 1000);
      setIntervalId(id);
    } else if (!isRunning && intervalId) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, calculateKineticEnergy]);

  const qrData = {
    kineticEnergy: kineticEnergy.toFixed(2),
    distance: distance.toFixed(2),
    status: isRunning ? "Running" : "Stopped",
  };

  return (
    <div className="kinetic-energy-qr relative overflow-hidden min-h-screen w-full bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-900 p-2">
      <div className="absolute inset-0 bg-black opacity-50" />
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source
          src="https://media.istockphoto.com/id/466163101/video/long-descent-on-the-road.mp4?s=mp4-640x640-is&k=20&c=p4drhYwdJ-yAgXPjso876BxVoFSx1C6pQGWQjMEwfzM="
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl font-bold text-white mb-3 tracking-wider"
        >
          Kinetic Energy Tracker
        </motion.h1>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="qr-code p-6 bg-white/80 backdrop-blur-md rounded-lg shadow-lg"
        >
          <QRCode value={JSON.stringify(qrData)} size={160} />
        </motion.div>

        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="readings text-center mt-4 bg-white/30 backdrop-blur-lg rounded-xl p-4 shadow-lg w-full max-w-md"
        >
          <p className="text-xl text-white mb-3">
            Kinetic Energy:{" "}
            <span className="font-semibold text-yellow-300">
              {kineticEnergy.toFixed(2)} J
            </span>
          </p>
          <p className="text-xl text-white mb-3">
            Distance:{" "}
            <span className="font-semibold text-green-300">
              {distance.toFixed(2)} m
            </span>
          </p>
          <p className="text-xl text-white">
            Current Speed:{" "}
            <span className="font-semibold text-blue-300">
              {currentSpeed.toFixed(2)} m/s
            </span>
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="controls flex flex-wrap justify-center gap-3 mt-6"
        >
          <button
            onClick={handleStart}
            disabled={isRunning}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center shadow-lg"
          >
            <Bike className="mr-2" />
            Start
          </button>
          <button
            onClick={handleStop}
            disabled={!isRunning}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center shadow-lg"
          >
            <ZapOff className="mr-2" />
            Stop
          </button>
          <button
            onClick={handleReset}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center shadow-lg"
          >
            <RotateCcw className="mr-2" />
            Reset
          </button>
        </motion.div>

        <motion.button
          onClick={() => setShowDetails(!showDetails)}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center mt-6 shadow-lg"
        >
          {showDetails ? (
            <ChevronUp className="mr-2" />
          ) : (
            <ChevronDown className="mr-2" />
          )}
          {showDetails ? "Hide Details" : "Show Details"}
        </motion.button>

        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-3xl bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-4 shadow-lg mt-6 overflow-hidden"
            >
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={energyData}>
                  <XAxis dataKey="time" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.7)",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#ffffff" }}
                    formatter={(value) => [`${value.toFixed(2)} J`, "Energy"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="energy"
                    stroke="#4ade80"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default KineticEnergyQR;
