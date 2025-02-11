"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

interface ContactSubmission {
  id: string;
  name: string;
  contactInfo: string;
  description: string;
}

const AdminContactPage: React.FC = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/admin/api/contact");
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(
            `Error ${res.status}: ${res.statusText}. ${errorText}`
          );
        }

        const data = await res.json();
        setSubmissions(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error fetching contact submissions:", err.message);
        } else {
          console.error("Error fetching contact submissions:", err);
        }
        setError("Failed to load contact submissions.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-lg font-medium text-gray-600">
          Loading submissions...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-lg font-medium text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
          Contact Submissions
        </h1>
        {submissions.length === 0 ? (
          <p className="text-lg text-gray-600 text-center">
            No submissions found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-gray-200 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 border border-gray-200 p-8 flex flex-col justify-between"
              >
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    {submission.name}
                  </h2>
                  <p className="text-lg text-gray-600 mb-4">
                    <strong>Contact Info:</strong> {submission.contactInfo}
                  </p>
                  <p className="text-lg text-gray-600">
                    <strong>Description:</strong> {submission.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContactPage;
