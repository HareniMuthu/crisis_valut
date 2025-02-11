"use client";
import React, { useEffect, useState } from "react";

interface Submission {
  id: string;
  name: string;
  contactInfo: string;
  description: string;
}

const ContactSubmissions: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/admin/api/contact-us");
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(
            `Error ${res.status}: ${res.statusText}. ${errorText}`
          );
        }
        const data = await res.json();
        setSubmissions(Array.isArray(data) ? data : []);
      } catch (err: unknown) {
        console.error("Fetch Submissions Error:", err);
        if (err instanceof Error) {
          setError(err.message || "Failed to fetch submissions.");
        } else {
          setError("Failed to fetch submissions.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-lg text-gray-700">
        Loading submissions...
      </p>
    );
  }

  if (error) {
    return <p className="text-center text-red-600 text-lg">Error: {error}</p>;
  }

  if (submissions.length === 0) {
    return (
      <p className="text-center text-lg text-gray-700">No submissions found.</p>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {submissions.map((submission) => (
        <div
          key={submission.id}
          className="bg-gray-400 p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 border border-gray-300 transform hover:-translate-y-1 transition-transform"
        >
          <p className="text-lg font-semibold text-gray-900">
            <strong>Name:</strong> {submission.name}
          </p>
          <p className="text-lg text-gray-700 mt-2">
            <strong>Contact Info:</strong> {submission.contactInfo}
          </p>
          <p className="text-lg text-gray-700 mt-2">
            <strong>Description:</strong> {submission.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ContactSubmissions;
