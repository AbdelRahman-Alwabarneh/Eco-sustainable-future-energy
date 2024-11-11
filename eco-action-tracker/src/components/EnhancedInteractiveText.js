"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ThreeScene from "./ThreeScene";

export default function EnhancedInteractiveText() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  const letters = ["K", "E"]; // Represents Kinetic Energy
  const colors = ["#fdb713", "#fdb713"]; // Use yellow (#fdb713) for the letters

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full bg-black overflow-hidden"
    >
      <ThreeScene />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex mb-8">
          {letters.map((letter, index) => (
            <motion.div
              key={index}
              className="text-9xl font-extrabold"
              style={{
                color: colors[index],
                textShadow: "0 0 30px rgba(253, 183, 19, 0.7)", // Yellow glow effect
              }}
              animate={{
                x: mousePosition.x * 50 - 25,
                y: mousePosition.y * 50 - 25,
                rotateY: mousePosition.x * 20 - 10,
                rotateX: -mousePosition.y * 20 + 10,
                scale: [1, 1.2, 1],
              }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
            >
              {letter}
            </motion.div>
          ))}
        </div>
        <motion.h1
          className="text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Kinetic Energy Challenge
        </motion.h1>
        <motion.p
          className="text-2xl text-white text-center max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          Join the movement! Discover how kinetic energy powers our world. Every
          step you take counts towards a sustainable future!
        </motion.p>
        <motion.button
          className="mt-8 px-6 py-3 bg-yellow-500 text-black rounded-full text-xl font-semibold hover:bg-yellow-600 transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start the Challenge
        </motion.button>
      </div>
    </div>
  );
}
