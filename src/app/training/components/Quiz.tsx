"use client";

import React from "react";

interface QuizProps {
  question: string;
  options: { value: string; label: string }[];
  correctAnswer: string;
}

const Quiz: React.FC<QuizProps> = ({ question, options, correctAnswer }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedOption = (
      document.querySelector("input[name='quiz']:checked") as HTMLInputElement
    )?.value;

    if (selectedOption === correctAnswer) {
      alert("Correct!");
    } else {
      alert(`Incorrect! The correct answer is "${correctAnswer}".`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <p className="text-gray-700 font-medium">{question}</p>
      {options.map((option, idx) => (
        <label key={idx} className="block text-gray-600">
          <input
            type="radio"
            name="quiz"
            value={option.value}
            className="mr-2"
          />
          {option.label}
        </label>
      ))}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Submit
      </button>
    </form>
  );
};

export default Quiz;
