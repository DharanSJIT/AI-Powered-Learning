import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

// Pages
import Welcome from "./pages/Welcome";

// Components
import DashboardGrid from "./components/DashboardGrid";
import LearningPath from "./components/LearningPath";
import QuizGenerator from "./components/QuizGenerator";
import TodoList from "./components/TodoList";
import ChatAssistant from "./components/ChatAssistant";
import ProgressTracker from "./components/ProgressTracker";
import Bookmarks from "./components/Bookmarks";
import Settings from "./components/Settings"; 
import Notes from "./components/Notes"; // Learning Resources (Notes) component
import Summarization from "./components/Summarization"; // Summarization component

export default function App() {
  const [user] = useAuthState(auth);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [darkMode, setDarkMode] = useState(false);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      showToast("✅ Login successful!", "success");
    } catch (error) {
      console.error(error);
      showToast("❌ Login failed", "error");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      showToast("🚪 Logout successful!", "error");
    } catch (error) {
      console.error(error);
      showToast("❌ Logout failed", "error");
    }
  };

  // Handle Dark Mode Toggle
  const handleThemeChange = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark"); // Apply dark class to the html element
      localStorage.setItem("theme", "dark"); // Save preference in localStorage
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark"); // Apply dark mode globally if saved preference is dark
    }
  }, []);

  return (
    <Router>
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-3 shadow bg-white dark:bg-gray-800">
        <h1 className="text-xl font-bold text-indigo-600 dark:text-white">
          🚀 AI-powered Personalized Learning
        </h1>
        <div>
          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Login / Signup
            </button>
          )}
        </div>
      </nav>

      {/* ✅ Toast Notification */}
      {toast.message && (
        <div
          className={`fixed right-4 top-[60px] px-4 py-2 rounded-lg shadow-lg text-white transition-all duration-500 ease-in-out z-50
          ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
          {toast.message}
        </div>
      )}

      {/* ✅ Routes */}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<DashboardGrid user={user} />} />
        {/* 🧩 Tool Routes */}
        <Route path="/learning-path" element={<LearningPath />} />
        <Route path="/quiz-generator" element={<QuizGenerator />} />
        <Route path="/todo-list" element={<TodoList />} />
        <Route path="/mentor" element={<ChatAssistant user={user} />} />
        <Route path="/progress-tracker" element={<ProgressTracker />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/notes" element={<Notes />} /> {/* Learning Resources (Notes) Route */}
        <Route path="/summarization" element={<Summarization />} /> {/* Summarization Route */}
        <Route path="/settings" element={<Settings onThemeChange={handleThemeChange} />} /> {/* Pass theme handler */}
      </Routes>

      {/* Fixed Theme Toggle Button at the Bottom Right */}
      <button
        onClick={handleThemeChange}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg hover:bg-indigo-700 focus:outline-none"
        title="Toggle Dark Mode"
      >
        {darkMode ? (
          <span className="text-lg font-semibold">🌙</span>
        ) : (
          <span className="text-lg font-semibold">🌞</span>
        )}
      </button>
    </Router>
  );
}
