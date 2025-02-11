"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import AdminIncidentList from "./components/AdminIncidentList";
import Navbar from "./components/Navbar";

const ADMIN_ID = "user_2pOZNUIyrR0rh9wGNDHBp8IJntt";

const AdminPage: React.FC = () => {
  const { user } = useUser();

  // Check if the current user is the admin
  if (user?.id !== ADMIN_ID) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-bold text-red-500">
          Unauthorized: You do not have access to this page.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <div className="flex flex-col items-center py-12">
        <h1 className="text-4xl font-bold text-black mb-6">Admin Dashboard</h1>
        <p className="text-lg text-black mb-12">
          Manage incidents, messages, and submissions here.
        </p>
        {/* Incident List */}
        <AdminIncidentList />
      </div>
    </div>
  );
};

export default AdminPage;
