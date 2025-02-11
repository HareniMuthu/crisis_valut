"use client";

import React from "react";
import { useRouter } from "next/navigation";

const BackButton: React.FC = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
    >
      Go Back
    </button>
  );
};

export default BackButton;
