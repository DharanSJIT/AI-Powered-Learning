import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

export default function Navbar() {
  const [user] = useAuthState(auth);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* Logo / Title */}
      <h1 className="text-2xl font-bold text-indigo-700">
        🚀 AI-powered Personalized Learning
      </h1>

      {/* Right side (Auth buttons) */}
      <div>
        {!user ? (
          <button
            onClick={handleGoogleSignIn}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Login / Signup
          </button>
        ) : (
          <div className="flex items-center space-x-4">
            <span className="text-slate-700 font-medium">
              Hello, {user.displayName || "Learner"} 👋
            </span>
            <img
              src={user.photoURL || "https://via.placeholder.com/32"}
              alt="avatar"
              className="w-8 h-8 rounded-full border"
            />
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
