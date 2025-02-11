"use client";
import React, { useEffect, useState } from "react";

interface Incident {
  id: string;
  userId: string;
  title: string;
  type: string;
  severity: string;
  date: string;
  status: string;
}

const AdminIncidentTable: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
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

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/admin/api/incidents/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update status.");
      }

      const updatedIncident = await res.json();

      // Update the incident in the local state
      setIncidents((prev) =>
        prev.map((incident) =>
          incident.id === id ? updatedIncident : incident
        )
      );
    } catch (err: unknown) {
      console.error("Update Status Error:", err);
      if (err instanceof Error) {
        alert(`Error: ${err.message}`);
      } else {
        alert("Failed to update status.");
      }
    }
  };

  if (loading) {
    return <p className="text-center text-black">Loading incidents...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">Error: {error}</p>;
  }

  if (incidents.length === 0) {
    return <p className="text-center text-black">No incidents found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-black text-left text-sm text-black">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-3 py-2 border-b border-black text-xs font-medium text-center">
              ID
            </th>
            <th className="px-3 py-2 border-b border-black text-xs font-medium text-center">
              User ID
            </th>
            <th className="px-3 py-2 border-b border-black text-xs font-medium text-center">
              Title
            </th>
            <th className="px-3 py-2 border-b border-black text-xs font-medium text-center">
              Type
            </th>
            <th className="px-3 py-2 border-b border-black text-xs font-medium text-center">
              Severity
            </th>
            <th className="px-3 py-2 border-b border-black text-xs font-medium text-center">
              Date
            </th>
            <th className="px-3 py-2 border-b border-black text-xs font-medium text-center">
              Status
            </th>
            <th className="px-3 py-2 border-b border-black text-xs font-medium text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident) => (
            <tr key={incident.id} className="hover:bg-gray-100">
              <td className="px-3 py-2 border-b border-black text-xs text-center">
                {incident.id}
              </td>
              <td className="px-3 py-2 border-b border-black text-xs text-center">
                {incident.userId}
              </td>
              <td className="px-3 py-2 border-b border-black text-xs text-center">
                {incident.title}
              </td>
              <td className="px-3 py-2 border-b border-black text-xs text-center">
                {incident.type}
              </td>
              <td className="px-3 py-2 border-b border-black text-xs text-center">
                {incident.severity}
              </td>
              <td className="px-3 py-2 border-b border-black text-xs text-center">
                {new Date(incident.date).toLocaleDateString()}
              </td>
              <td className="px-3 py-2 border-b border-black text-xs text-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(
                    incident.status
                  )}`}
                >
                  {incident.status.replace("_", " ")}
                </span>
              </td>
              <td className="px-3 py-2 border-b border-black text-xs text-center">
                <select
                  value={incident.status}
                  onChange={(e) =>
                    handleStatusChange(incident.id, e.target.value)
                  }
                  className="border border-black rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-black mx-auto"
                  aria-label={`Change status for incident ${incident.title}`}
                >
                  <option value="NOT_VIEWED">Not Viewed</option>
                  <option value="VIEWED">Viewed</option>
                  <option value="ACTION_TAKEN">Action Taken</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminIncidentTable;
