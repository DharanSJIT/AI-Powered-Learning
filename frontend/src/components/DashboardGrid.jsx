import React from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardGrid({ user }) {
  const navigate = useNavigate();

  const tools = [
    {
      id: 1,
      label: "Learning Path",
      route: "/learning-path",
      color: "bg-sky-400",
    },
    {
      id: 2,
      label: "Quiz Generator",
      route: "/quiz-generator",
      color: "bg-orange-500",
    },
     {
      id: 3,
      label: "Learning Resources",
      route: "/notes",
      color: "bg-teal-500",
    },
    
    {
      id: 4,
      label: "Summarization",
      route: "/summarization",
      color: "bg-yellow-400",
    },
    {
      id: 5,
      label: "Progress Tracker",
      route: "/progress-tracker",  // Updated to match the route you've defined for Progress Tracker
      color: "bg-purple-600",
    },
    {
      id: 6,
      label: "AI Mentor",
      route: "/mentor",
      color: "bg-green-500",
    },
    {
      id: 7,
      label: "Bookmarks",
      route: "/bookmarks",
      color: "bg-rose-400",
    },
    {
      id: 8,
      label: "To-Do List",
      route: "/todo-list",
      color: "bg-indigo-600",
    },
   
    {
      id: 9,
      label: "Settings",
      route: "/settings",
      color: "bg-red-800",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          👋 Welcome {user?.displayName || "Learner"}!
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => navigate(tool.route)}
              className={`h-32 text-white font-semibold text-lg rounded-xl shadow-lg flex items-center justify-center transition-transform hover:scale-105 ${tool.color}`}
            >
              {tool.id}. {tool.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
