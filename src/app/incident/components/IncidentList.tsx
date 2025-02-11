"use client";

import React, { useState, useEffect, useRef } from "react";
import IncidentDetailModal from "./IncidentDetailModal";

interface Incident {
  id: string;
  incident_id: string; // Ensure incident_id is included
  title: string;
  type: string;
  date: string; // ISO date string
  severity: string;
  location: string;
  description: string;
  status: string; // e.g., "NOT_VIEWED", "VIEWED", "ACTION_TAKEN"
}

interface IncidentListProps {
  userId: string;
}

const POLLING_INTERVAL = 2000; // 2 seconds in milliseconds

const IncidentList: React.FC<IncidentListProps> = ({ userId }) => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(
    null
  );

  // useRef to store the interval ID so it can be cleared on unmount
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchIncidents = async () => {
    try {
      const res = await fetch(`/admin/api/incidents`);
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error ${res.status}: ${res.statusText}. ${errorText}`);
      }
      const data = await res.json();

      // Check if the data is valid and an array
      if (!Array.isArray(data)) {
        throw new Error("Unexpected response format.");
      }

      // Optional: Compare with existing incidents to prevent unnecessary state updates
      // This can optimize performance if data hasn't changed
      setIncidents((prevIncidents) => {
        // Simple deep comparison (can be optimized)
        const isEqual =
          prevIncidents.length === data.length &&
          prevIncidents.every(
            (incident, index) => incident.id === data[index].id
          );
        if (isEqual) {
          return prevIncidents; // No change
        }
        // Sort incidents by date descending
        const sortedIncidents = data.sort((a: Incident, b: Incident) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        });
        return sortedIncidents;
      });
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

  useEffect(() => {
    // Initial fetch
    fetchIncidents();

    // Set up polling
    intervalRef.current = setInterval(() => {
      fetchIncidents();
    }, POLLING_INTERVAL);

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [userId]); // Re-run if userId changes

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
    return <p className="text-center text-gray-700">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">Error: {error}</p>;
  }

  if (incidents.length === 0) {
    return (
      <p className="text-center text-gray-700">
        No incidents found. Report a new one to get started!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {incidents.map((incident) => (
        <button
          key={incident.id}
          className="w-full bg-white border border-gray-300 rounded-lg p-6 shadow hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 flex flex-col items-center justify-between h-full"
          onClick={() => setSelectedIncident(incident)}
          aria-label={`View details for incident titled ${incident.title}`}
        >
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              {incident.title}
            </h3>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Type:</span> {incident.type} |{" "}
              <span className="font-medium">Date:</span>{" "}
              {new Date(incident.date).toLocaleDateString()} |{" "}
              <span className="font-medium">Severity:</span> {incident.severity}
            </p>
            <p className="text-sm text-gray-600 mt-2 truncate">
              {incident.description}
            </p>
          </div>
          <div className="mt-4 flex justify-center">
            <span
              className={`w-4 h-4 rounded-full ${getStatusColor(
                incident.status
              )}`}
              title={incident.status.replace("_", " ")}
              aria-label={`Status: ${incident.status.replace("_", " ")}`}
            ></span>
          </div>
        </button>
      ))}

      {selectedIncident && (
        <IncidentDetailModal
          incident={selectedIncident}
          onClose={() => setSelectedIncident(null)}
        />
      )}
    </div>
  );
};

export default IncidentList;
