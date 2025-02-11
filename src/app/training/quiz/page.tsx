"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: string;
}

const QuizPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useState({ total: 0, correct: 0, wrong: 0 });

  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch("/training/api/quiz/questions");
      if (res.ok) {
        const data = await res.json();
        setQuestions(data.slice(0, 10)); // Limit to 10 questions
      }
    };

    fetchQuestions();
  }, []);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    const correct = questions.filter((q, i) => q.correct === answers[i]).length;
    const total = questions.length;
    const wrong = total - correct;

    setStats({ total, correct, wrong });
    setShowStats(true);

    // Save stats to database
    await fetch("/training/api/quiz/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ total, correct, wrong }),
    });
  };

  if (showStats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black">
        <div className="w-full max-w-3xl text-center">
          <h1 className="text-4xl font-bold mb-6">Quiz Completed!</h1>
          <div className="p-8 border border-black rounded-lg">
            <p className="text-lg mb-4">
              <strong>Total Questions:</strong> {stats.total}
            </p>
            <p className="text-lg mb-4">
              <strong>Correct:</strong> {stats.correct}
            </p>
            <p className="text-lg mb-4">
              <strong>Wrong:</strong> {stats.wrong}
            </p>
            <button
              onClick={() => router.push("/training")}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Back to Training
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="w-full max-w-4xl p-10 border border-black rounded-lg">
        <h1 className="text-4xl font-bold text-center mb-8">Quiz</h1>
        {questions.length > 0 && (
          <div>
            <p className="text-xl font-semibold mb-4">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            <p className="text-2xl mb-8">
              {questions[currentQuestionIndex].question}
            </p>
            <div className="space-y-4">
              {questions[currentQuestionIndex].options.map((option, optIdx) => (
                <label
                  key={optIdx}
                  className="block p-4 border border-black rounded-lg cursor-pointer hover:bg-gray-100 transition"
                >
                  <input
                    type="radio"
                    name={`q-${currentQuestionIndex}`}
                    value={option}
                    checked={answers[currentQuestionIndex] === option}
                    onChange={() =>
                      setAnswers({ ...answers, [currentQuestionIndex]: option })
                    }
                    className="mr-3"
                  />
                  {option}
                </label>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className={`px-6 py-3 rounded-lg font-medium ${
                  currentQuestionIndex === 0
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800 transition"
                }`}
              >
                Previous
              </button>
              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition font-medium"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
