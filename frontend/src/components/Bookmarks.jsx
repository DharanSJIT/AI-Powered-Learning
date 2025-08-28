import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Bookmarks() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const addBookmark = () => {
    if (!title.trim() || !category.trim()) return;

    const newBookmark = {
      title,
      description,
      category,
      file: file ? URL.createObjectURL(file) : null,
    };

    setBookmarks([...bookmarks, newBookmark]);
    setTitle("");
    setDescription("");
    setCategory("");
    setFile(null);
  };

  const deleteBookmark = (index) => {
    const updatedBookmarks = bookmarks.filter((_, i) => i !== index);
    setBookmarks(updatedBookmarks);
  };

  const filteredBookmarks = bookmarks.filter((bookmark) =>
    bookmark.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg w-[70vw] mx-auto mt-[80px]">
      {/* Back to Dashboard Button */}
      <Link
        to="/home"
        className="inline-block mb-4 text-sm text-blue-600 hover:underline"
      >
        ← Back to Dashboard
      </Link>

      <h2 className="font-bold text-xl text-slate-800 mb-6">🔖 Bookmarks</h2>

      {/* Bookmark Input Form */}
      <div className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Bookmark Title"
          className="p-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="p-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="p-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
        />

        {/* File Upload Section */}
        <div>
          <label className="block text-sm font-medium text-slate-800 mb-2">Upload File (PDF/Notes)</label>
          <input
            type="file"
            accept=".pdf,.txt,.docx"
            onChange={handleFileChange}
            className="p-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
          />
        </div>

        <button
          onClick={addBookmark}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-300"
        >
          Add Bookmark
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Bookmarks"
          className="p-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 w-full"
        />
      </div>

      {/* Bookmarks List */}
      {filteredBookmarks.length > 0 ? (
        <ul className="space-y-6">
          {filteredBookmarks.map((bookmark, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-4 bg-slate-50 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-slate-800">{bookmark.title}</h3>
                <p className="text-xs text-slate-500">{bookmark.description}</p>
                <p className="text-xs text-slate-400">Category: {bookmark.category}</p>
                {bookmark.file && (
                  <a
                    href={bookmark.file}
                    className="text-blue-500 text-xs hover:text-blue-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View File
                  </a>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => deleteBookmark(index)}
                  className="px-3 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 text-xs"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-500 text-sm">No bookmarks yet. Add one above! ✍️</p>
      )}
    </div>
  );
}
