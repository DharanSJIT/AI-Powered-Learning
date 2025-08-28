import React from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-100">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">
          🎓 Welcome to AI Learning
        </h1>
        <p className="text-slate-600 mb-8">
          An AI-powered personalized learning platform with smart
          recommendations, quizzes, and chat assistance.
        </p>

        <button
          onClick={() => navigate("/home")}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-lg font-medium shadow-md hover:bg-indigo-700 transition"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
