import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  HelpCircle, 
  StickyNote, 
  FileText, 
  TrendingUp, 
  Users, 
  Bookmark, 
  CheckSquare, 
  Settings,
  ChevronRight
} from "lucide-react";

export default function DashboardGrid({ user }) {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const tools = [
    {
      id: 1,
      label: "Learning Path",
      route: "/learning-path",
      gradient: "from-sky-400 to-cyan-500",
      icon: BookOpen,
      description: "Personalized learning journey"
    },
    {
      id: 2,
      label: "Quiz Generator",
      route: "/quiz-generator",
      gradient: "from-orange-400 to-red-500",
      icon: HelpCircle,
      description: "Test your knowledge"
    },
    {
      id: 3,
      label: "Learning Resources",
      route: "/notes",
      gradient: "from-teal-400 to-emerald-500",
      icon: StickyNote,
      description: "Organize study materials"
    },
    {
      id: 4,
      label: "Summarization",
      route: "/summarization",
      gradient: "from-yellow-400 to-orange-500",
      icon: FileText,
      description: "AI text summarization"
    },
    {
      id: 5,
      label: "Progress Tracker",
      route: "/progress-tracker",
      gradient: "from-purple-500 to-violet-600",
      icon: TrendingUp,
      description: "Monitor your progress"
    },
    {
      id: 6,
      label: "AI Mentor",
      route: "/mentor",
      gradient: "from-green-400 to-emerald-600",
      icon: Users,
      description: "Get personalized guidance"
    },
    {
      id: 7,
      label: "Bookmarks",
      route: "/bookmarks",
      gradient: "from-rose-400 to-pink-500",
      icon: Bookmark,
      description: "Save important resources"
    },
    {
      id: 8,
      label: "To-Do List",
      route: "/todo-list",
      gradient: "from-indigo-500 to-purple-600",
      icon: CheckSquare,
      description: "Manage your tasks"
    },
    {
      id: 9,
      label: "Settings",
      route: "/settings",
      gradient: "from-gray-600 to-gray-800",
      icon: Settings,
      description: "Customize experience"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Simple Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Welcome back, {user?.displayName || "Learner"}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Choose a tool to continue your learning journey
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => navigate(tool.route)}
              onMouseEnter={() => setHoveredCard(tool.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`
                relative h-32 rounded-2xl shadow-lg hover:shadow-xl
                bg-gradient-to-br ${tool.gradient}
                transform transition-all duration-300 hover:scale-105
                text-white text-left p-6 group overflow-hidden
              `}
            >
              {/* Subtle background pattern */}
              <div className="absolute inset-0 bg-white/10"></div>
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <tool.icon className="w-7 h-7 mb-2" />
                  <ChevronRight 
                    className={`w-5 h-5 transition-transform duration-300 ${
                      hoveredCard === tool.id ? 'translate-x-1' : ''
                    }`}
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-1">{tool.label}</h3>
                  <p className="text-sm opacity-90">{tool.description}</p>
                </div>
              </div>

              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
            </button>
          ))}
        </div>

        {/* Simple footer */}
        <div className="mt-12 text-center">
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Ready to learn something new?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Explore our AI-powered learning tools designed for your success
            </p>
            <button 
              onClick={() => navigate('/learning-path')}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
            >
              Start Learning →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}