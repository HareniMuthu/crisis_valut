"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import IncidentFormModal from "./components/IncidentFormModal";
import IncidentList from "./components/IncidentList";
import Navbar from "../../components/Navbar";
import { Footer } from "../../components/footer";

const IncidentPage = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      {/* Top Section */}
      <div className="w-full flex justify-center items-center py-40 text-center border-b-2 border-gray-200">
        <div>
          <h1 className="text-6xl font-extrabold mb-6 text-gray-800">
            Manage Your Incidents
          </h1>
          <p className="text-lg text-gray-500 mb-8">
            Report and track incidents effortlessly.
          </p>
          <IncidentFormModal />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full bg-black py-12 flex-grow">
        <div className="max-w-6xl mx-auto p-6">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Recently Reported Incidents
          </h2>
          <IncidentList userId={user?.id ?? ""} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default IncidentPage;
