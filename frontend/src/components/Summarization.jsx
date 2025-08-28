import React, { useState } from "react";
import axios from "axios";

const Summarization = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "AIzaSyCnjvQINniC3uNIGjIxc3xTscwvSnY5NSI";  // Replace with your actual Gemini API Key

  const summarizeText = async () => {
    setLoading(true);
    setError("");
    try {
      // Using CORS Proxy for local development
      const response = await axios.post(
        "https://cors-anywhere.herokuapp.com/https://gemini.googleapis.com/v1/summarize",  // Using proxy URL
        {
          text: text,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      setSummary(response.data.summary);
    } catch (err) {
      setError("Error while summarizing the note. Please try again later.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">Summarize Your Note</h3>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your long note here..."
        rows="6"
        className="w-full p-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-white"
      />
      <button
        onClick={summarizeText}
        disabled={loading}
        className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-300"
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {summary && (
        <div className="mt-6">
          <h4 className="font-semibold text-lg text-slate-800 dark:text-white">Summary:</h4>
          <p className="text-slate-700 dark:text-gray-300">{summary}</p>
        </div>
      )}
    </div>
  );
};

export default Summarization;
