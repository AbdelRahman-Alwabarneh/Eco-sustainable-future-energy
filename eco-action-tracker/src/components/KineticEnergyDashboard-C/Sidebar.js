import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Battery, Users, Video, Zap } from "lucide-react";
import VideoModal from "./VideoModal";

const Sidebar = ({ sidebarWidth = 25 }) => {
  const [totalEnergy, setTotalEnergy] = useState(5000);
  const [participants, setParticipants] = useState(340);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Simulating increasing energy and participants
  useEffect(() => {
    const energyInterval = setInterval(() => {
      setTotalEnergy(
        (prevEnergy) => prevEnergy + Math.floor(Math.random() * 10)
      );
    }, 3000);

    const participantInterval = setInterval(() => {
      setParticipants((prevParticipants) => prevParticipants + 1);
    }, 9000);

    return () => {
      clearInterval(energyInterval);
      clearInterval(participantInterval);
    };
  }, []);

  const tips = [
    "Use energy-efficient LED bulbs",
    "Unplug devices when not in use",
    "Optimize your thermostat settings",
    "Use natural light when possible",
    "Invest in energy-efficient appliances",
  ];

  // Sample energy consumption data
  const energyBreakdown = [
    { category: "Lighting", amount: 500 },
    { category: "Heating", amount: 900 },
    { category: "Cooling", amount: 400 },
    { category: "Appliances", amount: 200 },
  ];

  return (
    <motion.div
      style={{ width: `${sidebarWidth}%` }}
      className="bg-[#2d3134] p-6 shadow-lg rounded-r-lg overflow-y-auto h-screen scrollbar"
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
        <Battery className="mr-2 text-[#fdb713]" /> Energy Dashboard
      </h2>

      {/* Energy Produced Alert */}
      <div className="mb-6 bg-[#484c50] border-l-4 border-[#fdb713] p-4 rounded-md shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-[#fdb713] mr-2" />
          <h3 className="font-bold text-white">Energy Produced</h3>
        </div>
        <p className="text-2xl font-bold text-[#fdb713]">
          {totalEnergy.toLocaleString()} kWh
        </p>
        <motion.div
          className="h-2 bg-[#fdb713] rounded-full mt-2"
          initial={{ width: 0 }}
          animate={{ width: `${(totalEnergy % 10000) / 100}%` }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* Participants Count */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2 text-white flex items-center">
          <Users className="mr-2 text-[#fdb713]" /> Participants
        </h3>
        <p className="text-xl font-bold text-[#fdb713]">
          {participants.toLocaleString()}
        </p>
        <motion.div
          className="h-2 bg-[#484c50] rounded-full mt-2"
          initial={{ width: 0 }}
          animate={{ width: `${(participants % 100) * 2}%` }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* Kinetic Energy Conversion Explanation */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2 text-white flex items-center">
          <Zap className="mr-2 text-[#fdb713]" /> Kinetic Energy to Electricity
        </h3>
        <img
          src="https://i.pinimg.com/enabled/564x/47/53/e4/4753e4e9c7b4244b470df55282c7c2e6.jpg" // Replace with actual image URL or path
          alt="Kinetic energy conversion"
          className="w-full mb-4 rounded-lg shadow-md"
        />
        <p className="text-gray-300">
          Kinetic energy can be converted into electricity through various
          means. For instance, wind turbines harness the kinetic energy of the
          wind to rotate their blades, which in turn power a generator to
          produce electricity. Similarly, devices like bicycle generators
          convert the motion of pedaling into electrical energy, showcasing the
          power of movement!
        </p>
      </div>

      {/* Tips Section */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2 text-white">Energy Tips</h3>
        <ul className="space-y-2">
          {tips.map((tip, index) => (
            <motion.li
              key={index}
              className="flex items-start"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="inline-block bg-[#fdb713] rounded-full p-1 mr-2 mt-1">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </span>
              <span className="text-gray-300">{tip}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Watch Video Button */}
      <button
        onClick={() => setIsVideoOpen(true)}
        className="w-full bg-[#fdb713] text-white rounded-md p-3 hover:bg-[#eaa910] transition-colors duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
      >
        <Video className="mr-2" /> Watch Awareness Video
      </button>

      <VideoModal showVideo={isVideoOpen} setShowVideo={setIsVideoOpen} />
    </motion.div>
  );
};

export default Sidebar;
