"use client";

import React, { useEffect, useState } from "react";
import AdminIncidentModal from "./AdminIncidentModal";

interface ChatMessage {
  id: string;
  senderId: string;
  message: string;
  timestamp: string;
}

interface Incident {
  id: string;
  incident_id: string; // Ensure incident_id is included
  userId: string;
  title: string;
  type: string;
  severity: string;
  date: string;
  location: string;
  description: string;
  status: string; // Added status field
  chatMessages: ChatMessage[];
}

const AdminIncidentList: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/admin/api/incidents");

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(
            `Error ${res.status}: ${res.statusText}. ${errorText}`
          );
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Unexpected response format.");
        }

        setIncidents(data);
      } catch (err: unknown) {
        console.error("Fetch Incidents Error:", err);
        if (err instanceof Error) {
          setError(err.message || "Failed to fetch incidents.");
        } else {
          setError("Failed to fetch incidents.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NOT_VIEWED":
        return "bg-red-600";
      case "VIEWED":
        return "bg-yellow-400";
      case "ACTION_TAKEN":
        return "bg-green-500";
      default:
        return "bg-gray-400";
    }
  };

  if (loading) {
    return (
      <p className="text-center text-black text-lg">Loading incidents...</p>
    );
  }

  if (error) {
    return <p className="text-center text-red-600 text-lg">Error: {error}</p>;
  }

  if (incidents.length === 0) {
    return (
      <p className="text-center text-black text-lg">No incidents found.</p>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {incidents.map((incident) => (
        <button
          key={incident.id}
          className="w-full bg-gray-200 border border-gray-300 rounded-lg p-6 shadow hover:shadow-lg transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transform hover:-translate-y-1 transition-transform"
          onClick={() => setSelectedIncident(incident)}
          aria-label={`View details for incident titled ${incident.title}`}
        >
          <div className="flex justify-between items-center">
            <div className="text-left space-y-2">
              <h3 className="text-2xl font-semibold text-black">
                {incident.title}
              </h3>
              <p className="text-sm text-gray-800">
                <span className="font-medium">Type:</span> {incident.type} |{" "}
                <span className="font-medium">Date:</span>{" "}
                {new Date(incident.date).toLocaleDateString()} |{" "}
                <span className="font-medium">Severity:</span>{" "}
                {incident.severity}
              </p>
              <p className="text-sm text-gray-800 line-clamp-2">
                {incident.description}
              </p>
            </div>
            <div>
              <span
                className={`w-5 h-5 rounded-full ${getStatusColor(
                  incident.status
                )}`}
                title={incident.status.replace("_", " ")}
                aria-label={`Status: ${incident.status.replace("_", " ")}`}
              ></span>
            </div>
          </div>
        </button>
      ))}

      {selectedIncident && (
        <AdminIncidentModal
          incident={selectedIncident}
          onClose={() => setSelectedIncident(null)}
          onStatusChange={(updatedIncident: Incident) => {
            setIncidents((prev) =>
              prev.map((inc) =>
                inc.id === updatedIncident.id ? updatedIncident : inc
              )
            );
            setSelectedIncident(updatedIncident);
          }}
        />
      )}
    </div>
  );
};

export default AdminIncidentList;
