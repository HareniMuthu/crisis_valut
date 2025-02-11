import React from "react";
import { FlipWords } from "../components/ui/flip-words";
import Link from "next/link";

export function FlipWordsDemo() {
  const words = ["Problems", "Issues", "Challenges", "Obstacles"];

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-white text-center text-gray-800 px-8">
      {/* Hero Text */}
      <div className="text-6xl font-bold">
        Are you facing any <FlipWords words={words} />? <br />
        <span className="text-2xl font-light mt-4 block">
          Let us help you resolve it swiftly.
        </span>
      </div>

      {/* Button */}
      <Link href="/incident">
        <button className="mt-12 px-10 py-4 text-xl font-medium text-white bg-black hover:bg-gray-800 transition-all duration-300 rounded-lg shadow-lg">
          Report an Incident
        </button>
      </Link>
    </div>
  );
}
