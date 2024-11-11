"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import ChallengeCard from "./KineticEnergyDashboard-C/ChallengeCard";
import UserDashboard from "./KineticEnergyDashboard-C/UserDashboard";
import Sidebar from "./KineticEnergyDashboard-C/Sidebar";
import VideoModal from "./KineticEnergyDashboard-C/VideoModal";
import ToastNotifications from "./KineticEnergyDashboard-C/ToastNotifications";
import { AlertCircle, Battery, Users, Video, Zap } from "lucide-react";

const MIN_SIDEBAR_WIDTH = 10;
const MIN_CENTER_WIDTH = 20;
const MIN_USER_DASHBOARD_WIDTH = 15;
const MAX_WIDTH = 90;

const KineticEnergyDashboard = () => {
  const [widths, setWidths] = useState({
    sidebar: 25,
    center: 50,
  });
  const [showVideo, setShowVideo] = useState(false);
  const [totalEnergy, setTotalEnergy] = useState(1234);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState([]);

  const isDragging = useRef(false);
  const initialPosition = useRef(0);
  const dragSide = useRef(null);

  useEffect(() => {
    const getAuthToken = () => {
      const cookies = document.cookie.split("; ");
      const tokenCookie = cookies.find((cookie) =>
        cookie.startsWith("authToken=")
      );
      return tokenCookie ? tokenCookie.split("=")[1] : null;
    };

    const authToken = getAuthToken();

    fetch("http://localhost:3000/api/challenges", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`, // Use the authToken from the cookie
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setChallenges(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching challenges:", error);
        setError("Failed to load challenges.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const getTokenFromCookie = () => {
      const cookieName = "authToken";
      const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith(cookieName))
        ?.split("=")[1];

      return cookieValue;
    };

    const token = getTokenFromCookie();

    fetch("http://localhost:3000/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data.");
      });
  }, []);

  useEffect(() => {
    const savedWidths = JSON.parse(localStorage.getItem("dashboardWidths"));
    if (savedWidths) {
      setWidths(savedWidths);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dashboardWidths", JSON.stringify(widths));
  }, [widths]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalEnergy(
        (prevEnergy) => prevEnergy + Math.floor(Math.random() * 10)
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseDown = useCallback((e, side) => {
    isDragging.current = true;
    initialPosition.current = e.clientX;
    dragSide.current = side;
    e.preventDefault();

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging.current) return;

    const deltaX = e.clientX - initialPosition.current;
    const deltaPercentage = (deltaX / window.innerWidth) * 100;

    setWidths((prevWidths) => {
      const newWidths = { ...prevWidths };

      if (dragSide.current === "left") {
        newWidths.sidebar = Math.min(
          Math.max(prevWidths.sidebar + deltaPercentage, MIN_SIDEBAR_WIDTH),
          MAX_WIDTH
        );
      } else if (dragSide.current === "right") {
        newWidths.center = Math.min(
          Math.max(prevWidths.center - deltaPercentage, MIN_CENTER_WIDTH),
          MAX_WIDTH
        );
      }

      const totalWidth = newWidths.sidebar + newWidths.center;
      if (totalWidth > 100) {
        newWidths.sidebar = Math.max(
          MIN_SIDEBAR_WIDTH,
          newWidths.sidebar - (totalWidth - 100)
        );
        newWidths.center = Math.max(
          MIN_CENTER_WIDTH,
          newWidths.center - (totalWidth - 100)
        );
      }

      return newWidths;
    });

    initialPosition.current = e.clientX;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  const handleJoinChallenge = (challengeId) => {
    setChallenges((prevChallenges) =>
      prevChallenges.map((challenge) =>
        challenge.id === challengeId
          ? { ...challenge, participants: challenge.participants + 1 }
          : challenge
      )
    );
    setUser((prevUser) => ({
      ...prevUser,
      currentChallenges: [
        ...prevUser.currentChallenges,
        {
          name: challenges.find((c) => c.id === challengeId).name,
          progress: 0,
        },
      ],
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      setWidths((prevWidths) => ({
        sidebar: Math.max(prevWidths.sidebar - 1, MIN_SIDEBAR_WIDTH),
        center: prevWidths.center,
      }));
    } else if (e.key === "ArrowRight") {
      setWidths((prevWidths) => ({
        sidebar: Math.min(prevWidths.sidebar + 1, MAX_WIDTH),
        center: prevWidths.center,
      }));
    } else if (e.key === "ArrowUp") {
      setWidths((prevWidths) => ({
        sidebar: prevWidths.sidebar,
        center: Math.max(prevWidths.center - 1, MIN_CENTER_WIDTH),
      }));
    } else if (e.key === "ArrowDown") {
      setWidths((prevWidths) => ({
        sidebar: prevWidths.sidebar,
        center: Math.min(prevWidths.center + 1, MAX_WIDTH),
      }));
    }
  };

  return (
    <div
      className="flex h-screen text-white bg-[#2d3134]"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <Sidebar
        totalEnergy={totalEnergy}
        setShowVideo={setShowVideo}
        sidebarWidth={widths.sidebar}
        themeColors={{
          background: "#2d3134",
          highlight: "#fdb713",
          text: "white",
        }} // Pass theme colors
      />

      {/* Left Divider */}
      <div
        className="w-3 bg-[#2d3134] cursor-col-resize hover:bg-[#fdb713] transition-colors duration-200 flex items-center justify-center"
        onMouseDown={(e) => handleMouseDown(e, "left")}
      >
        <div className="h-8 w-1 bg-gray-500 rounded-md" />
      </div>

      {/* Center Content */}
      <motion.div
        style={{ width: `${widths.center}%`, transition: "width 0.2s ease" }}
        className="p-6 overflow-y-auto bg-[#2d3134] text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
          <Zap className="mr-2 text-[#fdb713]" /> Active Challenges
        </h2>
        {challenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            onJoin={handleJoinChallenge}
            challengeId={challenge._id}
            themeColors={{
              background: "#2d3134",
              highlight: "#fdb713",
              text: "white",
            }} // Pass theme colors
          />
        ))}
      </motion.div>

      {/* Right Divider */}
      <div
        className="w-3 bg-[#2d3134] cursor-col-resize hover:bg-[#fdb713] transition-colors duration-200 flex items-center justify-center"
        onMouseDown={(e) => handleMouseDown(e, "right")}
      >
        <div className="h-8 w-1 bg-gray-500 rounded-md" />
      </div>

      {/* User Dashboard */}
      <motion.div
        style={{
          width: `${100 - widths.sidebar - widths.center}%`,
          minWidth: "500px",
          maxWidth: "900px",
          maxHeight: "calc(150vh - 2px)",
          overflowY: "auto",
          transition: "width 0.2s ease",
        }}
        className="p-5 bg-[#2d3134]"
        initial={{ x: 300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
          <Users className="mr-2 text-[#fdb713]" /> UserDashboard
        </h2>
        <UserDashboard
          user={user}
          themeColors={{
            background: "#2d3134",
            highlight: "#fdb713",
            text: "white",
          }}
        />
      </motion.div>

      <VideoModal showVideo={showVideo} setShowVideo={setShowVideo} />
      {/* <ToastNotifications currentChallenges={user.currentChallenges} /> */}

      {/* Current Widths Display */}
      <div className="absolute bottom-5 right-4 bg-white p-2 rounded shadow-lg text-black">
        <p>Sidebar Width: {widths.sidebar.toFixed(2)}%</p>
        <p>Center Width: {widths.center.toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default KineticEnergyDashboard;
