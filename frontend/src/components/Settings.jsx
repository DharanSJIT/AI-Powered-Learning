import React, { useState } from "react";
import { FaMoon, FaSun, FaBell } from "react-icons/fa"; // Using react-icons for icons
import { Link } from "react-router-dom"; // Assuming Link is from react-router-dom for navigation

export default function Settings({ onThemeChange }) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMismatch, setIsPasswordMismatch] = useState(false);

  // Handle Dark Mode Toggle
  const handleThemeChange = () => {
    setDarkMode(!darkMode);
    onThemeChange(); // This will apply the theme changes globally in App.jsx
  };

  // Handle Notifications Toggle
  const handleNotificationChange = () => {
    setNotifications(!notifications);
  };

  // Handle Email Update
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle Password Update
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle Confirm Password Update
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Save Settings
  const handleSaveSettings = () => {
    if (password !== confirmPassword) {
      setIsPasswordMismatch(true);
      return;
    }

    console.log("Settings saved");

    // Reset form after saving
    setIsPasswordMismatch(false);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-[70vw] mx-auto mt-[100px] transition-all duration-300 ease-in-out">
      <Link to="/home" className="inline-block mb-4 text-sm text-blue-600 hover:underline">
        ← Back to Dashboard
      </Link>
      
      <h2 className="font-bold text-xl text-slate-800 dark:text-white mb-4">🔧 Settings</h2>

      {/* Dark Mode Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-800 dark:text-white">Dark Mode</span>
          <span className="text-sm text-slate-500 dark:text-slate-400">Switch between light and dark themes</span>
        </div>
        <div>
          <button
            onClick={handleThemeChange}
            className="flex items-center justify-center p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all duration-300"
            title="Toggle Dark Mode"
          >
            {darkMode ? (
              <FaSun className="w-5 h-5 text-yellow-400" />
            ) : (
              <FaMoon className="w-5 h-5 text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Notification Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-800 dark:text-white">Enable Notifications</span>
          <span className="text-sm text-slate-500 dark:text-slate-400">Receive notifications for updates</span>
        </div>
        <div>
          <button
            onClick={handleNotificationChange}
            className="flex items-center justify-center p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all duration-300"
            title="Toggle Notifications"
          >
            {notifications ? (
              <FaBell className="w-5 h-5 text-yellow-400" />
            ) : (
              <FaBell className="w-5 h-5 text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Account Settings Section */}
      <h3 className="text-lg font-semibold text-slate-700 dark:text-white mb-4">Account Settings</h3>

      {/* Email Update */}
      <div className="flex flex-col gap-3 mb-6">
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="New Email Address"
          className="p-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-white transition-all duration-200 ease-in-out"
        />
      </div>

      {/* Password Update */}
      <div className="flex flex-col gap-3 mb-6">
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="New Password"
          className="p-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-white transition-all duration-200 ease-in-out"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="Confirm Password"
          className="p-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-white transition-all duration-200 ease-in-out"
        />
        {isPasswordMismatch && (
          <p className="text-red-500 text-sm mt-2">Passwords do not match!</p>
        )}
      </div>

      {/* Save Settings Button */}
      <button
        onClick={handleSaveSettings}
        className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-300"
      >
        Save Settings
      </button>
    </div>
  );
}
