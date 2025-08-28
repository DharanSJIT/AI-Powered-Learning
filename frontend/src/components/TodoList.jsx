import React, { useState } from "react";
import { Link } from "react-router-dom"; // <-- Import

export default function TodoList() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Add a new task
  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  // Delete a task
  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    if (editingIndex === index) {
      setEditingIndex(null);
      setEditingText("");
    }
  };

  // Start editing a task
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index].text);
  };

  // Save the edited task
  const saveEdit = (index) => {
    if (!editingText.trim()) return;
    const updated = [...tasks];
    updated[index].text = editingText;
    setTasks(updated);
    setEditingIndex(null);
    setEditingText("");
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingIndex(null);
    setEditingText("");
  };

  // Toggle task completion
  const toggleCompletion = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  return (
    <div className="p-6 bg-white rounded-2xl h-full w-[80vw] mx-auto absolute top-[85px] left-1/2 transform -translate-x-1/2">
      {/* 🔙 Back Link */}
      <Link
        to="/home"
        className="inline-block mb-4 text-sm text-blue-600 hover:underline"
      >
        ← Back to Dashboard
      </Link>

      <h2 className="font-bold text-xl text-slate-800 mb-4">✅ To-Do List</h2>

      {/* Input Section */}
      <div className="flex w-full gap-2 mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a task..."
          className="flex-1 px-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      {tasks.length > 0 ? (
        <ul className="space-y-3 text-sm text-slate-700">
          {tasks.map((taskItem, i) => (
            <li
              key={i}
              className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border"
            >
              {editingIndex === i ? (
                <div className="flex w-full items-center gap-2">
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="flex-1 px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    onClick={() => saveEdit(i)}
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-2 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 text-xs"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span
                    className={`flex-1 ${taskItem.completed ? "line-through text-gray-500" : ""}`}
                  >
                    {taskItem.text}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleCompletion(i)}
                      className={`px-2 py-1 ${taskItem.completed ? "bg-gray-400 text-white" : "bg-green-500 text-white"} rounded hover:bg-green-600 text-xs`}
                    >
                      {taskItem.completed ? "Undo" : "Complete"}
                    </button>
                    <button
                      onClick={() => startEditing(i)}
                      className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(i)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-500 text-sm">No tasks yet. Add one above! ✍️</p>
      )}
    </div>
  );
}
