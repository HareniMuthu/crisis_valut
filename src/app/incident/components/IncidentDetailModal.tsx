// File: src/components/incidentdetailmodal.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import ChatSection from "./ChatSection";

interface IncidentDetailModalProps {
  incident: {
    id: string;
    incident_id: string; // Ensure incident_id is included
    title: string;
    type: string;
    date: string;
    severity: string;
    location: string;
    description: string;
    status: string; // Add status field
  };
  onClose: () => void;
  isAdmin?: boolean; // Distinguish admin messages
}

interface Message {
  id: string;
  senderId: string;
  message: string;
  timestamp: string;
}

const IncidentDetailModal: React.FC<IncidentDetailModalProps> = ({
  incident,
  onClose,
  isAdmin = false,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch messages when the component mounts or incident_id changes
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `/incident/api/chat?incidentId=${incident.incident_id}`
        );
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch messages.");
        }
        const data = await res.json();
        setMessages(data);
      } catch (err: unknown) {
        console.error(err instanceof Error ? err.message : "Unknown error");
        setError(
          err instanceof Error ? err.message : "Failed to load messages."
        );
      }
    };

    fetchMessages();
  }, [incident.incident_id]);

  // Function to handle sending messages
  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/incident/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          incidentId: incident.incident_id, // Use incident_id string
          message,
          senderId: isAdmin ? "admin" : "user",
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to send message.");
      }
      const newChat = await res.json();
      setMessages((prev) => [...prev, newChat]);
      inputRef.current?.focus();
    } catch (err: unknown) {
      console.error(err instanceof Error ? err.message : "Unknown error");
      setError(err instanceof Error ? err.message : "Failed to send message.");
    } finally {
      setLoading(false);
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

  // Function to determine status color
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

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="incident-detail-title"
    >
      <div
        ref={modalRef}
        className="bg-white w-full max-w-4xl h-4/5 rounded-lg shadow-lg flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2
            id="incident-detail-title"
            className="text-2xl font-semibold text-gray-800"
          >
            {incident.title}
          </h2>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
              incident.status
            )}`}
            aria-label={`Status: ${incident.status.replace("_", " ")}`}
          >
            {incident.status.replace("_", " ")}
          </span>
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Close incident details"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-grow overflow-hidden">
          {/* Left Side: Incident Details */}
          <div className="w-1/2 p-6 overflow-y-auto">
            <p className="mb-2">
              <strong>Type:</strong> {incident.type}
            </p>
            <p className="mb-2">
              <strong>Date:</strong>{" "}
              {new Date(incident.date).toLocaleDateString()}
            </p>
            <p className="mb-2">
              <strong>Severity:</strong> {incident.severity}
            </p>
            <p className="mb-2">
              <strong>Location:</strong> {incident.location}
            </p>
            <p className="text-gray-700">{incident.description}</p>
          </div>

          {/* Right Side: Chatbox */}
          <div className="w-1/2 p-6 flex flex-col bg-gray-50">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Chat</h3>
            <ChatSection
              incidentId={incident.incident_id}
              messages={messages}
              setMessages={setMessages}
              handleSendMessage={handleSendMessage}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetailModal;
