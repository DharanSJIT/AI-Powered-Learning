import React, { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export default function AI_TodoList() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTask, setEditingTask] = useState({});
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Add Task
  const addTask = () => {
    if (!task.trim()) return;

    const newTask = {
      text: task,
      completed: false,
      priority,
      dueDate,
      id: Date.now(),
    };

    setTasks([newTask, ...tasks]);
    setTask("");
    setPriority("Medium");
    setDueDate("");
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
    if (editingIndex !== null && tasks[editingIndex]?.id === id) {
      cancelEdit();
    }
  };

  // Edit Task
  const startEditing = (taskItem, index) => {
    setEditingIndex(index);
    setEditingTask({ ...taskItem });
  };

  const saveEdit = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? editingTask : t)));
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditingTask({});
  };

  // Toggle Completion
  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // Clear Completed
  const clearCompleted = () => {
    setTasks(tasks.filter((t) => !t.completed));
  };

  // Filtered & Searched Tasks
  const displayedTasks = tasks.filter((t) => {
    if (filter === "Completed") return t.completed;
    if (filter === "Pending") return !t.completed;
    if (filter === "High") return t.priority === "High";
    return true;
  }).filter((t) => t.text.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg max-w-3xl mx-auto mt-10">
      {/* Back Link */}
      <Link
        to="/home"
        className="inline-block mb-4 text-sm text-blue-600 hover:underline"
      >
        ← Back to Dashboard
      </Link>

      <h2 className="font-bold text-2xl text-slate-800 mb-4">
        🤖 AI-Powered To-Do List
      </h2>

      {/* Input Section */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4 items-center">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a task..."
          className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-3 py-2 border rounded-xl focus:outline-none"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="px-3 py-2 border rounded-xl focus:outline-none"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
        >
          Add
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border rounded-xl focus:outline-none"
        >
          <option>All</option>
          <option>Completed</option>
          <option>Pending</option>
          <option>High</option>
        </select>
        <button
          onClick={clearCompleted}
          className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
        >
          Clear Completed
        </button>
      </div>

      {/* Task List */}
      {displayedTasks.length > 0 ? (
        <ul className="space-y-3">
          {displayedTasks.map((taskItem, i) => (
            <li
              key={taskItem.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-slate-50 rounded-lg border hover:shadow-md transition"
            >
              {editingIndex === i ? (
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  <input
                    type="text"
                    value={editingTask.text}
                    onChange={(e) =>
                      setEditingTask({ ...editingTask, text: e.target.value })
                    }
                    className="flex-1 px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <select
                    value={editingTask.priority}
                    onChange={(e) =>
                      setEditingTask({ ...editingTask, priority: e.target.value })
                    }
                    className="px-2 py-1 border rounded-md"
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                  <input
                    type="date"
                    value={editingTask.dueDate}
                    onChange={(e) =>
                      setEditingTask({ ...editingTask, dueDate: e.target.value })
                    }
                    className="px-2 py-1 border rounded-md"
                  />
                  <button
                    onClick={() => saveEdit(taskItem.id)}
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
                <div className="flex flex-col sm:flex-row w-full sm:items-center justify-between">
                  <div>
                    <span
                      className={`text-sm font-medium ${
                        taskItem.completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {taskItem.text}
                    </span>
                    <div className="text-xs mt-1 flex gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-white ${
                          taskItem.priority === "High"
                            ? "bg-red-500"
                            : taskItem.priority === "Medium"
                            ? "bg-yellow-400"
                            : "bg-green-500"
                        }`}
                      >
                        {taskItem.priority}
                      </span>
                      {taskItem.dueDate && (
                        <span className="text-gray-500">
                          Due: {format(new Date(taskItem.dueDate), "dd MMM yyyy")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => toggleCompletion(taskItem.id)}
                      className={`px-2 py-1 rounded text-xs ${
                        taskItem.completed
                          ? "bg-gray-400 text-white"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                    >
                      {taskItem.completed ? "Undo" : "Complete"}
                    </button>
                    <button
                      onClick={() => startEditing(taskItem, i)}
                      className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(taskItem.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-500 text-sm mt-4">
          No tasks yet. Add one above! ✍️
        </p>
      )}
    </div>
  );
}
