import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AI_TodoList() {
  const [taskText, setTaskText] = useState("");
  const [query, setQuery] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState([]);

  // Add new task
  const addTask = () => {
    if (!taskText.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: taskText,
        query,
        imageUrl,
        dueDate: dueDate ? new Date(dueDate) : null,
        aiContent: "",
        completed: false,
        loading: "",
      },
    ]);
    setTaskText("");
    setQuery("");
    setImageUrl("");
    setDueDate("");
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Toggle completion
  const toggleCompletion = (id) => {
    setTasks(tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  // Countdown timer
  const getRemainingTime = (due) => {
    if (!due) return "No deadline";
    const now = new Date();
    const diff = new Date(due) - now;
    if (diff <= 0) return "Overdue";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  // Force re-render every minute to update timers
  useEffect(() => {
    const interval = setInterval(() => setTasks((t) => [...t]), 60000);
    return () => clearInterval(interval);
  }, []);

  // Analyze task with Gemini
  const analyzeTask = async (taskId) => {
    setTasks(tasks.map((t) =>
      t.id === taskId ? { ...t, loading: "Analysing..." } : t
    ));

    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    try {
      const res = await fetch("http://localhost:4000/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: task.query })
      });
      const data = await res.json();
      const cleanText = data.text.replace(/\*/g, "");
      setTasks(tasks.map((t) =>
        t.id === taskId ? { ...t, aiContent: cleanText, loading: "" } : t
      ));
    } catch (err) {
      console.error("Gemini API Error:", err);
      setTasks(tasks.map((t) =>
        t.id === taskId ? { ...t, loading: "Error" } : t
      ));
    }
  };

  // Summarize AI content
  const summarizeTask = async (taskId) => {
    setTasks(tasks.map((t) =>
      t.id === taskId ? { ...t, loading: "Summarizing..." } : t
    ));

    const task = tasks.find((t) => t.id === taskId);
    if (!task || !task.aiContent) return;

    try {
      const res = await fetch("http://localhost:4000/api/gemini/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: task.aiContent })
      });
      const data = await res.json();
      const cleanSummary = data.summary.replace(/\*/g, "");
      setTasks(tasks.map((t) =>
        t.id === taskId ? { ...t, aiContent: cleanSummary, loading: "" } : t
      ));
    } catch (err) {
      console.error("Gemini Summarize Error:", err);
      setTasks(tasks.map((t) =>
        t.id === taskId ? { ...t, loading: "Error" } : t
      ));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/home" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Dashboard
        </Link>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          🤖 AI Powered To-Do List
        </h2>

        {/* Input Section */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-8 flex flex-col gap-3">
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Task title..."
            className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="AI query..."
            className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL..."
            className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={addTask}
            className="mt-2 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all"
          >
            Add Task
          </button>
        </div>

        {/* Tasks */}
        <ul className="space-y-6">
          {tasks.map((t) => (
            <li
              key={t.id}
              className={`bg-white shadow-md rounded-2xl p-5 flex flex-col gap-3 border-l-4 ${t.completed ? "border-green-400" : "border-indigo-400"}`}
            >
              <div className="flex justify-between items-center">
                <h3 className={`text-lg font-bold ${t.completed ? "line-through text-gray-400" : "text-gray-800"}`}>
                  {t.text}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleCompletion(t.id)}
                    className={`px-3 py-1 rounded-lg text-white font-medium ${t.completed ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}`}
                  >
                    {t.completed ? "Undo" : "Complete"}
                  </button>
                  <button
                    onClick={() => deleteTask(t.id)}
                    className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {t.imageUrl && (
                <img src={t.imageUrl} alt="Task" className="w-full max-w-sm rounded-xl shadow-sm" />
              )}

              <div className="text-sm text-gray-500">
                ⏱ Timer: {getRemainingTime(t.dueDate)}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                <input
                  type="text"
                  value={t.query}
                  onChange={(e) => setTasks(tasks.map(taskItem =>
                    taskItem.id === t.id ? { ...taskItem, query: e.target.value } : taskItem
                  ))}
                  placeholder="Edit AI query..."
                  className="flex-1 px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <button
                  onClick={() => analyzeTask(t.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-all"
                >
                  Analyze with AI
                </button>
                {t.aiContent && (
                  <button
                    onClick={() => summarizeTask(t.id)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 font-medium transition-all"
                  >
                    Summarize
                  </button>
                )}
              </div>

              {/* Loading / Status */}
              {t.loading && (
                <div className="mt-2 text-sm text-gray-500 italic">{t.loading}</div>
              )}

              {/* AI content */}
              {t.aiContent && (
                <div className="mt-3 p-3 bg-gray-50 rounded-xl text-sm whitespace-pre-wrap border border-gray-200">
                  {t.aiContent}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
