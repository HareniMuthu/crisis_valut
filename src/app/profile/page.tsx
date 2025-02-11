"use client";

import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { UserButton, useUser } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

// Register required Chart.js components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);

interface Incident {
  id: string;
  title: string;
  date: string;
  type: string;
  severity: string;
  status: string;
}

const ProfilePage: React.FC = () => {
  const { user } = useUser();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [quizStats, setQuizStats] = useState<{
    totalQuestions: number[];
    correctAnswers: number[];
    wrongAnswers: number[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await fetch("/profile/api/incidents");
        if (!res.ok) throw new Error("Failed to fetch incidents.");
        const data = await res.json();
        setIncidents(data);
      } catch {
        setError("Failed to fetch incidents.");
      }
    };

    const fetchQuizStats = async () => {
      try {
        const res = await fetch("/profile/api/quizstats");
        if (!res.ok) throw new Error("Failed to fetch quiz stats.");
        const data = await res.json();
        setQuizStats(data);
      } catch {
        setError("Failed to fetch quiz stats.");
      }
    };

    fetchIncidents();
    fetchQuizStats();
    setLoading(false);
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto py-10 px-4 mt-20">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
          <p className="text-gray-600">
            User ID: <strong>{user?.id}</strong>
          </p>
          <p className="text-gray-600">
            Name: <strong>{user?.fullName || "No name provided"}</strong>
          </p>
          <UserButton />
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Incidents
          </h2>
          {incidents.length > 0 ? (
            <ul className="space-y-4">
              {incidents.map((incident) => (
                <li
                  key={incident.id}
                  className="border border-gray-300 p-4 rounded-lg shadow"
                >
                  <p>
                    <strong>Title:</strong> {incident.title}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(incident.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Type:</strong> {incident.type}
                  </p>
                  <p>
                    <strong>Severity:</strong> {incident.severity}
                  </p>
                  <p>
                    <strong>Status:</strong> {incident.status}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No incidents found.</p>
          )}
        </div>

        {quizStats && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Quiz Statistics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Bar
                  data={{
                    labels: quizStats.totalQuestions.map(
                      (_, idx) => `Quiz ${idx + 1}`
                    ),
                    datasets: [
                      {
                        label: "Correct Answers",
                        data: quizStats.correctAnswers,
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                      },
                      {
                        label: "Wrong Answers",
                        data: quizStats.wrongAnswers,
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: { legend: { position: "top" } },
                  }}
                />
              </div>
              <div>
                <Pie
                  data={{
                    labels: ["Correct Answers", "Wrong Answers"],
                    datasets: [
                      {
                        data: [
                          quizStats.correctAnswers.reduce((a, b) => a + b, 0),
                          quizStats.wrongAnswers.reduce((a, b) => a + b, 0),
                        ],
                        backgroundColor: [
                          "rgba(75, 192, 192, 0.2)",
                          "rgba(255, 99, 132, 0.2)",
                        ],
                        borderColor: [
                          "rgba(75, 192, 192, 1)",
                          "rgba(255, 99, 132, 1)",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{ responsive: true }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
