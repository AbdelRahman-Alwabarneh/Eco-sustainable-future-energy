"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, Award, Battery, Zap, Users } from 'lucide-react';

const ImpactPage = () => {
    const userImpact = {
        weeklyContribution: 25.5,
        monthlyCO2Reduction: 150,
        yearlyEnergySaved: 1200,
    };

    const leaderboardData = [
        { name: 'John Doe', contribution: 500 },
        { name: 'Jane Smith', contribution: 450 },
        { name: 'Alice Johnson', contribution: 400 },
        { name: 'Bob Williams', contribution: 350 },
        { name: 'Emma Brown', contribution: 300 },
    ];

    const monthlyData = [
        { name: 'Jan', energy: 65 },
        { name: 'Feb', energy: 75 },
        { name: 'Mar', energy: 90 },
        { name: 'Apr', energy: 85 },
        { name: 'May', energy: 100 },
        { name: 'Jun', energy: 110 },
    ];

    const challenges = [
        {
            title: "Summer Energy Sprint",
            description: "Generate the most energy during the summer months",
            targetEnergy: 1000,
            currentEnergy: 750,
            progress: 75,
            startDate: "2024-06-01",
            endDate: "2024-08-31",
            thumbnail: "/summer-challenge.jpg",
            status: "active",
        },
        {
            title: "Earth Day Power Boost",
            description: "Maximize energy production on Earth Day",
            targetEnergy: 500,
            currentEnergy: 0,
            progress: 0,
            startDate: "2025-04-22",
            endDate: "2025-04-22",
            thumbnail: "/earth-day-challenge.jpg",
            status: "upcoming",
        },
    ];

    return (
        <div className="bg-[#2D3134] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-[#FAF8ED] mb-12 text-center">Your Environmental Impact</h1>

                {/* Personal Impact Section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold text-[#FAF8ED] mb-6">Your Contributions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-[#FAF8ED] rounded-lg p-6 text-center">
                            <Activity className="w-12 h-12 text-[#fdb713] mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-[#2D3134] mb-2">Weekly Contribution</h3>
                            <p className="text-3xl font-bold text-[#fdb713]">{userImpact.weeklyContribution} kWh</p>
                        </div>
                        <div className="bg-[#FAF8ED] rounded-lg p-6 text-center">
                            <Zap className="w-12 h-12 text-[#fdb713] mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-[#2D3134] mb-2">Monthly CO2 Reduction</h3>
                            <p className="text-3xl font-bold text-[#fdb713]">{userImpact.monthlyCO2Reduction} kg</p>
                        </div>
                        <div className="bg-[#FAF8ED] rounded-lg p-6 text-center">
                            <Battery className="w-12 h-12 text-[#fdb713] mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-[#2D3134] mb-2">Yearly Energy Saved</h3>
                            <p className="text-3xl font-bold text-[#fdb713]">{userImpact.yearlyEnergySaved} kWh</p>
                        </div>
                    </div>
                </section>

                {/* Monthly Energy Chart */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold text-[#FAF8ED] mb-6">Monthly Energy Generation</h2>
                    <div className="bg-[#FAF8ED] rounded-lg p-6">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="energy" fill="#fdb713" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </section>

                {/* Leaderboard Section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold text-[#FAF8ED] mb-6">Top Contributors</h2>
                    <div className="bg-[#FAF8ED] rounded-lg p-6">
                        <ul>
                            {leaderboardData.map((user, index) => (
                                <li key={index} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                                    <div className="flex items-center">
                                        <Award className="w-6 h-6 text-[#fdb713] mr-3" />
                                        <span className="text-[#2D3134] font-semibold">{user.name}</span>
                                    </div>
                                    <span className="text-[#fdb713] font-bold">{user.contribution} kWh</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Challenges Section */}
                <section>
                    <h2 className="text-2xl font-semibold text-[#FAF8ED] mb-6">Energy Challenges</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {challenges.map((challenge, index) => (
                            <div key={index} className="bg-[#FAF8ED] rounded-lg p-6">
                                <h3 className="text-xl font-semibold text-[#2D3134] mb-2">{challenge.title}</h3>
                                <p className="text-gray-600 mb-4">{challenge.description}</p>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-[#2D3134]">Progress</span>
                                    <span className="text-sm font-medium text-[#fdb713]">{challenge.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                    <div className="bg-[#fdb713] h-2.5 rounded-full" style={{ width: `${challenge.progress}%` }}></div>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Start: {challenge.startDate}</span>
                                    <span>End: {challenge.endDate}</span>
                                </div>
                                <div className="mt-4">
                                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${challenge.status === 'active' ? 'bg-green-500 text-white' :
                                            challenge.status === 'upcoming' ? 'bg-blue-500 text-white' :
                                                'bg-gray-500 text-white'
                                        }`}>
                                        {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ImpactPage;