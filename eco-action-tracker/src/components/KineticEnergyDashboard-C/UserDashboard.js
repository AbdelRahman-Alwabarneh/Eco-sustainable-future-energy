"use client";

import React, { useState, useEffect } from "react";
import {
  Trophy,
  Bike,
  Zap,
  Leaf,
  ChevronDown,
  ChevronUp,
  QrCode,
} from "lucide-react";
import "../../app/Sidebar.css";
import Link from "next/link";

const UserDashboard = ({ user = {} }) => {
  const userName =
    `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "User";
  const userPoints = user?.points || 0;
  const userEnergy = user?.totalEnergy || 0;
  const userCO2Reduced = Number((user?.totalCO2Reduction || 0).toFixed(2));
  const userChallengesWon = user?.challengesWon || 1;
  const [userChallengesJoined, setUserChallengesJoined] = useState(0);
  const [userCurrentChallenges, setUserCurrentChallenges] = useState([]);
  const [userCompletedChallenges, setUserCompletedChallenges] = useState([]);
  const [totalEnergyGenerated, setTotalEnergyGenerated] = useState(0);

  useEffect(() => {
    const fetchChallengesJoined = async () => {
      try {
        const token = getTokenFromCookie();
        const response = await fetch(
          "http://localhost:3000/api/joiningChallenges",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch challenges joined");
        }

        const data = await response.json();
        setUserChallengesJoined(data.count);
      } catch (error) {
        console.error("Error fetching challenges joined:", error);
      }
    };

    const fetchTotalEnergy = async () => {
      try {
        const token = getTokenFromCookie();
        const response = await fetch("/api/energyLogs", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch total energy generated");
        }

        const data = await response.json();
        setTotalEnergyGenerated(data.totalEnergyGenerated);
      } catch (error) {
        console.error("Error fetching total energy:", error);
      }
    };

    const fetchCurrentChallenges = async () => {
      try {
        const token = getTokenFromCookie();
        const response = await fetch("http://localhost:3000/api/challenges", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch current challenges");
        }

        const data = await response.json();
        setUserCurrentChallenges(data);
      } catch (error) {
        console.error("Error fetching current challenges:", error);
      }
    };

    const fetchCompletedChallenges = async () => {
      try {
        const token = getTokenFromCookie();
        const response = await fetch(
          "http://localhost:3000/api/challenges?type=completed",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch completed challenges");
        }

        const data = await response.json();
        setUserCompletedChallenges(data);
      } catch (error) {
        console.error("Error fetching completed challenges:", error);
      }
    };

    fetchChallengesJoined();
    fetchTotalEnergy();
    fetchCurrentChallenges();
    fetchCompletedChallenges();
  }, []);

  const getTokenFromCookie = () => {
    const cookieName = "authToken";
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith(cookieName))
      ?.split("=")[1];
  };

  return (
    <div className="bg-[#2d3134] min-h-full p-4 space-y-4 md:p-6">
      <Card className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <h2 className="text-2xl font-bold text-white">
          {userName}'s Dashboard
        </h2>
        <div className="text-right text-sm md:text-base">
          <p className="font-semibold text-gray-300">
            Total Points: <span className="text-[#fdb713]">{userPoints}</span>
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          icon={<Zap size={20} className="text-white" />}
          title="Total Energy"
          value={`${totalEnergyGenerated.toFixed(2)} kWh`}
        />

        <StatCard
          icon={<Leaf size={20} className="text-white" />}
          title="CO2 Reduced"
          value={`${userCO2Reduced} kg`}
        />
        <StatCard
          icon={<Trophy size={20} className="text-white-400" />}
          title="Challenges Won"
          value={userChallengesWon}
        />
        <StatCard
          icon={<Trophy size={20} className="text-white-400" />}
          title="Challenges Joined"
          value={userChallengesJoined}
        />
      </div>

      <Tabs
        tabs={[
          {
            label: "Current Challenges",
            content: (
              <div className="space-y-2">
                {userCurrentChallenges.map((challenge, index) => (
                  <ChallengeCard key={index} challenge={challenge} />
                ))}
              </div>
            ),
          },
          {
            label: "Completed Challenges",
            content: (
              <div className="space-y-2">
                {userCompletedChallenges.map((challenge, index) => (
                  <CompletedChallengeCard key={index} challenge={challenge} />
                ))}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-[#484c50] rounded-lg shadow-lg p-6 ${className}`}>
    {children}
  </div>
);

const StatCard = ({ icon, title, value }) => (
  <Card className="flex items-center space-x-4">
    <div className="p-2 bg-[#fdb713] rounded-full">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-300">{title}</p>
      <p className="text-2xl font-bold text-[#fdb713]">{value}</p>
    </div>
  </Card>
);

const Progress = ({ value }) => (
  <div className="w-full bg-[#fdb713] rounded-full h-2">
    <div
      className="bg-gradient-to-r from-[#fdb713] to-orange-600 h-2 rounded-full"
      style={{ width: `${value}%` }}
    />
  </div>
);

const ChallengeCard = ({ challenge }) => {
  console.log(challenge);
  const [expanded, setExpanded] = useState(false);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleQrButtonClick = () => {
    localStorage.setItem("challengeId", challenge._id);
  };

  return (
    <Card className="overflow-hidden">
      <div className="cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-lg font-semibold text-white">
            {challenge.title}
          </h4>
          <div className="flex items-center space-x-2">
            {expanded ? (
              <ChevronUp size={20} className="text-[#fdb713]" />
            ) : (
              <ChevronDown size={20} className="text-[#fdb713]" />
            )}
          </div>
        </div>
        <p className="text-sm text-gray-400 mt-2">
          Progress: {challenge.progress}%
        </p>
        <Progress value={challenge.progress} />
      </div>
      {expanded && (
        <div className="mt-4 pt-4 border-t border-[#fdb713]">
          <div className="flex items-center space-x-2">
            <Bike size={20} className="text-[#fdb713]" />
            <span className="text-sm text-gray-400">
              Target Energy : {challenge.targetEnergy}
            </span>
          </div>
          <p className="text-gray-300">
            <span className="font-semibold">Start:</span>{" "}
            {formatDate(challenge?.startDate)} at {challenge?.startHour}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold">End:</span>{" "}
            {formatDate(challenge?.endDate)} at {challenge?.endHour}
          </p>
          <Link href="/qr" passHref>
            <button
              onClick={handleQrButtonClick}
              className="mt-4 bg-[#fdb713] w-[10rem] hover:bg-orange-600 text-white rounded-full px-6 py-3 font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#fdb713] focus:ring-opacity-50 shadow-lg flex items-center"
            >
              <QrCode className="mr-2 h-5 w-5" />
              <span>Scan QR</span>
            </button>
          </Link>
        </div>
      )}
    </Card>
  );
};

const CompletedChallengeCard = ({ challenge }) => (
  <Card>
    <div className="flex justify-between items-center mb-2">
      <h4 className="text-lg font-semibold text-[#fdb713]">
        {challenge.title}
      </h4>
      <span className="text-sm font-medium text-[#fdb713]">
        {challenge.ranking}
      </span>
    </div>
    <div className="mt-2 flex items-center space-x-2">
      <Bike size={20} className="text-[#fdb713]" />
      Target Energy : {challenge.targetEnergy}
    </div>
  </Card>
);

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Card>
      <div className="flex border-b border-gray-700 mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 font-medium ${
              activeTab === index
                ? "text-[#fdb713] border-b-2 border-[#fdb713]"
                : "text-gray-500 hover:text-[#fdb713]"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs[activeTab].content}
    </Card>
  );
};

export default UserDashboard;
