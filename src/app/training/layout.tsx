import { Footer } from "@/components/footer";
import Navbar from "@/components/Navbar";
import React from "react";

const TrainingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
    <main className="max-w-6xl mx-auto py-12 px-6 pt-32">{children}</main>
      <Footer />
    </div>
  );
};

export default TrainingLayout;
