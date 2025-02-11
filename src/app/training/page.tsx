"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

interface QuizStat {
  correct: number;
  wrong: number;
}

const TrainingPage: React.FC = () => {
  const topics = [
    {
      name: "Road Accident",
      path: "/training/pages/RoadAccident",
      img: "/dbms images/road-accident.jpeg",
    },
    {
      name: "Food Contamination",
      path: "/training/pages/FoodContamination",
      img: "/dbms images/food-contamination.jpeg",
    },
    {
      name: "Water Supply Contamination",
      path: "/training/pages/WaterSupplyContamination",
      img: "/dbms images/water-contamination.jpg",
    },
    {
      name: "Building Fire",
      path: "/training/pages/BuildingFire",
      img: "/dbms images/building-fire.jpeg",
    },
    {
      name: "Chemical Spill",
      path: "/training/pages/ChemicalSpill",
      img: "/dbms images/Gas-leak.jpg",
    },
    {
      name: "Civil Unrest",
      path: "/training/pages/CivilUnrest",
      img: "/dbms images/civil-unrest.jpg",
    },
    {
      name: "Cyberattack",
      path: "/training/pages/Cyberattack",
      img: "/dbms images/cyber-attack.jpeg",
    },
    {
      name: "Flood",
      path: "/training/pages/Flood",
      img: "/dbms images/flood.jpeg",
    },
    {
      name: "Gas Leak",
      path: "/training/pages/GasLeak",
      img: "/dbms images/Gas-leak.jpg",
    },
    {
      name: "Heat Wave",
      path: "/training/pages/HeatWave",
      img: "/dbms images/heat-wave.jpeg",
    },
    {
      name: "Missing Person",
      path: "/training/pages/MissingPerson",
      img: "/dbms images/missing-person.jpeg",
    },
    {
      name: "Power Outage",
      path: "/training/pages/PowerOutage",
      img: "/dbms images/power-outage.jpeg",
    },
    {
      name: "Small-Scale Wildfire",
      path: "/training/pages/SmallScaleWildfire",
      img: "/dbms images/small-scale-wildfire.jpeg",
    },
    {
      name: "Transportation Delays",
      path: "/training/pages/TransportationDelays",
      img: "/dbms images/transportation-delays.jpeg",
    },
    {
      name: "Workplace Violence",
      path: "/training/pages/WorkplaceViolence",
      img: "/dbms images/Workplace-Violence.jpg",
    },
  ];
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("/training/api/quiz/stats");
      if (res.ok) {
        const data = await res.json();
        const correct = data.reduce(
          (acc: number, stat: QuizStat) => acc + stat.correct,
          0
        );
        const wrong = data.reduce(
          (acc: number, stat: QuizStat) => acc + stat.wrong,
          0
        );
        setStats({ correct, wrong });
      }
    };

    fetchStats();
  }, []);

  const chartData = [
    { name: "Correct", value: stats.correct },
    { name: "Wrong", value: stats.wrong },
  ];

  const COLORS = ["#4CAF50", "#FF5252"];

  return (
    <div className="min-h-screen bg-white text-black py-12 px-8">
      <h1 className="text-5xl font-bold text-center mb-12">
        Crisis Management Training
      </h1>

      {/* Training Topics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {topics.map((topic, idx) => (
          <Link key={idx} href={topic.path}>
            <div className="bg-gray-100 hover:bg-gray-200 text-black rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden">
              <img
                src={topic.img}
                alt={topic.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-center">
                  {topic.name}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quiz Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Take Quiz Section */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Take Quiz</h2>
          <p className="text-gray-600 mb-4">
            Test your knowledge with a random set of questions.
          </p>
          <Link href="/training/quiz">
            <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition">
              Start Quiz
            </button>
          </Link>
        </div>

        {/* Quiz Stats Section */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Your Quiz Stats</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart for Comparison */}
      <div className="mt-12 bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Bar Chart Comparison</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrainingPage;
