"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import { Footer } from "../../components/footer";

const ContactUsPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    contactInfo: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(5); // Countdown state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/contactus/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setSubmitted(true);
  };

  // Countdown timer and redirection
  useEffect(() => {
    if (submitted) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        router.push("/");
      }, 5000);

      return () => {
        clearInterval(interval); // Clear interval
        clearTimeout(timeout); // Clear timeout
      };
    }
  }, [submitted, router]);

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Thank You!</h1>
          <p className="text-gray-600">
            We have received your message. We will reach out to you shortly.
          </p>
          <p className="text-gray-500 mt-4">
            Redirecting to the homepage in{" "}
            <span className="font-bold">{countdown}</span> seconds...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Contact Us
          </h1>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="contactInfo"
              className="block text-sm font-medium text-gray-600"
            >
              Contact Info
            </label>
            <input
              id="contactInfo"
              type="text"
              value={formData.contactInfo}
              onChange={(e) =>
                setFormData({ ...formData, contactInfo: e.target.value })
              }
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              rows={4}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-300 shadow-lg"
          >
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUsPage;
