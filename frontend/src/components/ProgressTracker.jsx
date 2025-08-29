import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit, FaCheck, FaPlus, FaArrowLeft } from "react-icons/fa";

export default function ProgressTracker() {
  const [task, setTask] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [completedTasks, setCompletedTasks] = useState(0);

  // Subtask modal (simplified)
  const [subtaskInput, setSubtaskInput] = useState("");
  const [subtaskTargetIndex, setSubtaskTargetIndex] = useState(null);

  const addTask = () => {
    if (!task.trim()) return;
    const newTask = {
      name: task,
      description: taskDescription,
      dueDate,
      priority,
      completed: false,
      subtasks: [],
    };
    setTasks([...tasks, newTask]);
    clearInputs();
  };

  const clearInputs = () => {
    setTask("");
    setTaskDescription("");
    setDueDate("");
    setPriority("Medium");
    setIsEditing(false);
    setEditingIndex(null);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    calculateProgress(updated);
  };

  const startEditing = (index) => {
    const t = tasks[index];
    setIsEditing(true);
    setEditingIndex(index);
    setTask(t.name);
    setTaskDescription(t.description);
    setDueDate(t.dueDate);
    setPriority(t.priority);
  };

  const saveEdit = () => {
    const updated = tasks.map((t, i) =>
      i === editingIndex ? { ...t, name: task, description: taskDescription, dueDate, priority } : t
    );
    setTasks(updated);
    clearInputs();
    calculateProgress(updated);
  };

  const toggleCompletion = (index) => {
    const updated = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
    calculateProgress(updated);
  };

  const calculateProgress = (taskList) => {
    const completed = taskList.filter((t) => t.completed).length;
    setCompletedTasks(completed);
  };

  const addSubtask = () => {
    if (!subtaskInput.trim()) return;
    const updated = tasks.map((t, i) =>
      i === subtaskTargetIndex
        ? { ...t, subtasks: [...t.subtasks, { name: subtaskInput, completed: false }] }
        : t
    );
    setTasks(updated);
    setSubtaskInput("");
    setSubtaskTargetIndex(null);
    calculateProgress(updated);
  };

  const toggleSubtaskCompletion = (ti, si) => {
    const updated = tasks.map((t, i) =>
      i === ti
        ? {
            ...t,
            subtasks: t.subtasks.map((s, j) =>
              j === si ? { ...s, completed: !s.completed } : s
            ),
          }
        : t
    );
    setTasks(updated);
    calculateProgress(updated);
  };

  const progress = tasks.length === 0 ? 0 : (completedTasks / tasks.length) * 100;

  const priorityBadge = (level) => {
    const base = "px-2 py-1 text-xs rounded-full font-semibold";
    switch (level) {
      case "High":
        return `${base} bg-red-100 text-red-700`;
      case "Medium":
        return `${base} bg-yellow-100 text-yellow-700`;
      case "Low":
        return `${base} bg-green-100 text-green-700`;
      default:
        return base;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto mt-10 bg-white shadow-xl rounded-2xl">
      <Link to="/home" className="flex items-center text-blue-600 mb-4 hover:underline text-sm">
        <FaArrowLeft className="mr-2" /> Back to Dashboard
      </Link>

      <h2 className="text-2xl font-bold text-slate-800 mb-6">📊 Task Progress Tracker</h2>

      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Task title"
          className="p-3 border rounded-xl text-sm focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="p-3 border rounded-xl text-sm focus:ring-2 focus:ring-indigo-400"
        />
        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Description"
          className="p-3 border rounded-xl text-sm col-span-2 focus:ring-2 focus:ring-indigo-400"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-3 border rounded-xl text-sm focus:ring-2 focus:ring-indigo-400"
        >
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>
        <button
          onClick={isEditing ? saveEdit : addTask}
          className="bg-indigo-600 text-white rounded-xl px-4 py-2 hover:bg-indigo-700 transition"
        >
          {isEditing ? "Save Task" : "Add Task"}
        </button>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="w-full h-3 bg-gray-200 rounded-full">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {completedTasks} / {tasks.length} tasks completed ({progress.toFixed(0)}%)
        </p>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-slate-500">No tasks yet. Add one above! 🚀</p>
        ) : (
          tasks.map((t, i) => (
            <div key={i} className="border rounded-xl p-4 bg-gray-50 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className={`text-lg font-semibold ${t.completed ? "line-through text-gray-400" : ""}`}>
                    {t.name}
                  </p>
                  <span className={priorityBadge(t.priority)}>{t.priority} Priority</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toggleCompletion(i)} className="text-green-600 hover:text-green-800">
                    <FaCheck />
                  </button>
                  <button onClick={() => startEditing(i)} className="text-yellow-500 hover:text-yellow-600">
                    <FaEdit />
                  </button>
                  <button onClick={() => deleteTask(i)} className="text-red-500 hover:text-red-600">
                    <FaTrash />
                  </button>
                  <button
                    onClick={() => setSubtaskTargetIndex(i)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-1">{t.description}</p>
              <p className="text-xs text-gray-500">Due: {t.dueDate}</p>
              {/* Subtasks */}
              {t.subtasks.length > 0 && (
                <ul className="pl-4 mt-2 space-y-1">
                  {t.subtasks.map((sub, si) => (
                    <li key={si} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={sub.completed}
                        onChange={() => toggleSubtaskCompletion(i, si)}
                      />
                      <span className={`${sub.completed ? "line-through text-gray-400" : ""}`}>
                        {sub.name}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}
      </div>

      {/* Subtask Modal (inline) */}
      {subtaskTargetIndex !== null && (
        <div className="mt-4 border-t pt-4">
          <h3 className="text-sm font-semibold mb-2">Add Subtask</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={subtaskInput}
              onChange={(e) => setSubtaskInput(e.target.value)}
              placeholder="Subtask name"
              className="p-2 border rounded-lg w-full"
            />
            <button
              onClick={addSubtask}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
            <button
              onClick={() => {
                setSubtaskInput("");
                setSubtaskTargetIndex(null);
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
