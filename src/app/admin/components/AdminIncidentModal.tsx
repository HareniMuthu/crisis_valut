// File: src/components/AdminIncidentModal.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";

interface Prediction {
  prediction: string;
}

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
  status: string;
  chatMessages: ChatMessage[];
}

interface AdminIncidentModalProps {
  incident: Incident;
  onClose: () => void;
  onStatusChange: (updatedIncident: Incident) => void;
}

const AdminIncidentModal: React.FC<AdminIncidentModalProps> = ({
  incident,
  onClose,
  onStatusChange,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(
    incident.chatMessages || []
  );
  const [newMessage, setNewMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>(incident.status);
  const [updatingStatus, setUpdatingStatus] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isPredicting, setIsPredicting] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch(
        `/admin/api/chat?incidentId=${incident.incident_id}`
      );
      if (!res.ok) throw new Error("Failed to fetch messages.");
      const data = await res.json();
      setMessages(data);
    } catch (err: unknown) {
      console.error(err instanceof Error ? err.message : "Unknown error");
      setError("Failed to load messages.");
    }
  };

  const fetchPrediction = async () => {
    try {
      const res = await fetch(
        `/admin/api/predict?incidentId=${incident.incident_id}`
      );
      if (res.ok) {
        const data: Prediction = await res.json();
        if (data.prediction) {
          setPrediction(data.prediction);
          if (pollingRef.current) {
            clearInterval(pollingRef.current);
            pollingRef.current = null;
            setIsPredicting(false);
          }
        }
      } else if (res.status === 404) {
        // Prediction not yet available, trigger prediction
        if (!isPredicting) {
          await triggerPrediction();
        }
      } else {
        throw new Error("Failed to fetch prediction.");
      }
    } catch (err) {
      console.error("Error fetching prediction:", err);
      setError("Failed to fetch prediction.");
    }
  };

  const triggerPrediction = async () => {
    try {
      setIsPredicting(true);
      const res = await fetch("/admin/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ incidentId: incident.incident_id }),
      });

      if (!res.ok) {
        throw new Error("Failed to trigger prediction.");
      }

      // Start polling for prediction every 2 seconds
      pollingRef.current = setInterval(fetchPrediction, 2000);
    } catch (err) {
      console.error("Error triggering prediction:", err);
      setError("Failed to trigger prediction.");
      setIsPredicting(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchPrediction();

    // Cleanup polling on unmount
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, [incident.id]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/admin/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          incidentId: incident.incident_id, // Use incident_id string
          message: newMessage,
          senderId: "admin", // Admin sends messages
        }),
      });
      if (!res.ok) throw new Error("Failed to send message.");
      const newChat = await res.json();
      setMessages((prev) => [...prev, newChat]);
      setNewMessage("");
      inputRef.current?.focus();
    } catch (err: unknown) {
      console.error(err instanceof Error ? err.message : "Unknown error");
      setError("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setUpdatingStatus(true);
    setError(null);

    try {
      const res = await fetch(`/admin/api/incidents/${incident.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update status.");
      }

      const updatedIncident = await res.json();
      onStatusChange(updatedIncident); // Update parent state
    } catch (err: unknown) {
      console.error(err instanceof Error ? err.message : "Unknown error");
      setError("Failed to update status.");
      setStatus(incident.status); // Revert status on error
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NOT_VIEWED":
        return "text-red-600";
      case "VIEWED":
        return "text-yellow-500";
      case "ACTION_TAKEN":
        return "text-green-500";
      default:
        return "text-gray-600";
    }
  };

  // Close modal on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  // Close modal on Escape key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-incident-detail-title"
    >
      <div
        ref={modalRef}
        className="bg-white w-full max-w-4xl h-5/6 rounded-lg shadow-lg flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2
            id="admin-incident-detail-title"
            className="text-2xl font-semibold text-black"
          >
            {incident.title}
          </h2>
          <div className="flex items-center space-x-4">
            <span
              className={`px-3 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                status
              )}`}
              aria-label={`Status: ${status.replace("_", " ")}`}
            >
              {status.replace("_", " ")}
            </span>
            <select
              value={status}
              onChange={handleStatusChange}
              className="border border-black rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              disabled={updatingStatus}
              aria-label="Update incident status"
            >
              <option value="NOT_VIEWED">Not Viewed</option>
              <option value="VIEWED">Viewed</option>
              <option value="ACTION_TAKEN">Action Taken</option>
            </select>
          </div>
          <button
            onClick={onClose}
            className="text-black text-3xl font-bold hover:text-gray-700 focus:outline-none ml-2"
            aria-label="Close incident details"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-grow overflow-hidden">
          {/* Left Side: Incident Details */}
          <div className="w-1/2 p-6 overflow-y-auto bg-white">
            <p className="mb-4 text-left">
              <strong>Type:</strong> {incident.type}
            </p>
            <p className="mb-4 text-left">
              <strong>Date:</strong>{" "}
              {new Date(incident.date).toLocaleDateString()}
            </p>
            <p className="mb-4 text-left">
              <strong>Severity:</strong> {incident.severity}
            </p>
            <p className="mb-4 text-left">
              <strong>Location:</strong> {incident.location}
            </p>
            <p className="mb-4 text-left">
              <strong>Description:</strong> {incident.description}
            </p>
            <p className="mb-4 text-left">
              <strong>Predicted Crisis Type:</strong>{" "}
              {prediction || (isPredicting ? "Predicting..." : "No prediction")}
            </p>
            <button
              onClick={onClose}
              className="mt-8 bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition duration-300 focus:outline-none"
            >
              Close
            </button>
            {error && <p className="text-red-600 mt-4">{error}</p>}
          </div>

          {/* Right Side: Chatbox */}
          <div className="w-1/2 p-6 flex flex-col bg-gray-100">
            <h3 className="text-xl font-semibold mb-4 text-black text-center">
              Chat
            </h3>
            <div className="flex-grow overflow-y-auto border border-black rounded-lg p-4 bg-white mb-4">
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <div key={msg.id} className="mb-4">
                    <p className="text-base text-black">
                      <strong>
                        {msg.senderId === "admin" ? "Admin" : "User"}:
                      </strong>{" "}
                      {msg.message}
                    </p>
                    <p className="text-xs text-gray-600">
                      {new Date(msg.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No messages yet.</p>
              )}
            </div>
            <form onSubmit={handleSendMessage} className="flex">
              <input
                ref={inputRef}
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                required
                className="flex-grow px-4 py-3 border border-black rounded-l-lg focus:ring-2 focus:ring-black focus:outline-none"
                aria-label="Type your message"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-black text-white px-6 py-3 rounded-r-lg hover:bg-gray-700 transition duration-300 focus:outline-none"
                aria-label="Send message"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminIncidentModal;
