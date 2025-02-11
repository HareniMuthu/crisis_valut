"use client";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";

export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Master",
    },
    {
      text: "critical",
    },
    {
      text: "crisis",
    },
    {
      text: "management",
    },
    {
      text: "skills.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-black">
      {/* Introductory Text */}
      <p className="text-neutral-600 dark:text-neutral-200 text-xl sm:text-2xl md:text-3xl mb-8">
        Start your journey to becoming a crisis management expert
      </p>

      {/* Typewriter Effect */}
      <TypewriterEffectSmooth
        words={words}
        className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
      />

      {/* Call to Action Buttons */}
      <div className="mt-12">
        <a
          href="/training"
          className="px-12 py-4 rounded-xl bg-black text-white text-lg sm:text-xl font-medium hover:bg-gray-800 transition-all"
        >
          Explore Training
        </a>
      </div>
    </div>
  );
}
