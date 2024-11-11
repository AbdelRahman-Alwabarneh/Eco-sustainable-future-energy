import React from "react";
import { motion } from "framer-motion";

const ToastNotifications = ({ currentChallenges }) => {
  return (
    <div className="fixed bottom-0 right-0 p-6 space-y-4">
      {currentChallenges.map((challenge, index) => (
        <motion.div
          key={index}
          className="bg-white shadow-lg p-4 rounded-lg"
          initial={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: 20 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-orange-600 font-semibold">{challenge.name}</p>
          <p>Progress: {challenge.progress}%</p>
        </motion.div>
      ))}
    </div>
  );
};

export default ToastNotifications;
