import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Bell, Users, Trophy, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import "../../app/Sidebar.css"; // Ensure your CSS file includes styles for the new theme

const ChallengeCardspage = ({ challenge, onJoin, challengeId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [participants, setParticipants] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const fetchParticipants = async () => {
      const authToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];

      if (!authToken) {
        console.error("Auth token is missing.");
        return; // Exit early if the authToken is not available
      }

      try {
        const response = await fetch(
          `http://localhost:3000/api/joiningChallenges?challengeId=${challengeId}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        setParticipants(data.count);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    fetchParticipants();
  }, [challengeId]);

  const handleViewDetails = () => {
    router.push(`/challengeView/${challenge._id}`);
  };

  return (
    <>
      <motion.div
        className="bg-gradient-to-br from-[#484c50] to-[#4a4e53] rounded-xl p-6 mb-6 shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-[#fdb713]">
            {challenge.name}
          </h3>
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#fdb713] hover:text-white transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isExpanded ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
          </motion.button>
        </div>
        <div className="mb-6 relative">
          <img
            src={challenge.thumbnail}
            alt={challenge.name}
            className="w-full h-48 object-cover rounded-lg shadow-md"
          />
          <div className="absolute top-2 right-2 bg-[#fdb713] text-black px-3 py-1 rounded-full text-sm font-semibold">
            {challenge.status}
          </div>
        </div>
        <p className="text-md text-white mb-6 leading-relaxed">
          {challenge.description}
        </p>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-md font-medium text-white flex items-center">
              <Trophy size={20} className="mr-2 text-[#fdb713]" /> Progress
            </span>
            <span className="text-lg font-bold text-[#fdb713]">
              {challenge.progress}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-[#fdb713] to-orange-600 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${challenge.progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            ></motion.div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-md font-medium text-white flex items-center">
              <Zap size={20} className="mr-2 text-[#fdb713]" /> Energy
            </span>
            <span className="text-lg font-bold text-[#fdb713]">
              {challenge.currentEnergy} / {challenge.targetEnergy} kWh
            </span>
          </div>
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="mt-6 space-y-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between text-white">
                <span className="flex items-center">
                  <Users size={20} className="mr-2 text-[#fdb713]" />{" "}
                  Participants
                </span>
                <span className="font-bold text-[#fdb713]">{participants}</span>
              </div>
              <motion.button
                onClick={handleViewDetails}
                className="mt-4 w-full bg-gradient-to-r from-[#fdb713] to-orange-600 text-black rounded-lg p-3 hover:from-orange-600 hover:to-orange-700 transition-colors duration-200 font-semibold text-lg shadow-md"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                View Details
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default ChallengeCardspage;
