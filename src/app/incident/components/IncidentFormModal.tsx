"use client";

import React, { useState, useRef, useEffect } from "react";

const IncidentFormModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Modal visibility
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    date: "",
    severity: "",
    location: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/incident/api/incidents", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create incident");
      }

      // Reset form and close modal
      setFormData({
        title: "",
        type: "",
        date: "",
        severity: "",
        location: "",
        description: "",
      });
      setIsOpen(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
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
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  // Close modal on Escape key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    } else {
      document.removeEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-black text-white text-lg font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-800 transition duration-300"
        aria-label="Report a new incident"
      >
        Report New Incident
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="incident-form-title"
        >
          <div
            ref={modalRef}
            className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative"
          >
            <h2
              id="incident-form-title"
              className="text-xl font-bold mb-4 text-gray-800"
            >
              Report a New Incident
            </h2>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:outline-none"
                >
                  <option value="">Select Type</option>
                  <option value="POWER_OUTAGE">Power Outage</option>
                  <option value="ROAD_ACCIDENT">Road Accident</option>
                  <option value="BUILDING_FIRE">Building Fire</option>
                  <option value="FLOOD">Flood</option>
                  <option value="CIVIL_UNREST">Civil Unrest</option>
                  <option value="CYBERATTACK">Cyberattack</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="severity"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Severity
                </label>
                <select
                  id="severity"
                  name="severity"
                  value={formData.severity}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:outline-none"
                >
                  <option value="">Select Severity</option>
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="CRITICAL">Critical</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="location"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Location
                </label>
                <textarea
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:outline-none"
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:outline-none"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default IncidentFormModal;
