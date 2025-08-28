import React, { useState } from "react";
import axios from "axios";
import { Clipboard, ClipboardCheck } from "lucide-react"; // icons

const Summarization = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const apiKey = "YOUR_GEMINI_API_KEY"; // replace with your key

  const summarizeText = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "https://cors-anywhere.herokuapp.com/https://gemini.googleapis.com/v1/summarize",
        { text },
        { headers: { Authorization: `Bearer ${apiKey}` } }
      );
      setSummary(response.data.summary);
    } catch (err) {
      setError("⚠️ Error while summarizing. Please try again later.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl max-w-4xl  mx-auto transition-all duration-300 mt-[90px] ">
      <h3 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-6 text-center">
        ✨ AI Note Summarizer
      </h3>

      {/* Input Box */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="✍️ Paste your long note here..."
        rows="6"
        className="w-full p-4 border-2 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-gray-700 dark:text-white resize-none shadow-sm"
      />

      {/* Button */}
      <button
        onClick={summarizeText}
        disabled={loading || !text}
        className={`mt-5 w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
          loading || !text
            ? "bg-indigo-300 cursor-not-allowed"
            : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg"
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
            Summarizing...
          </span>
        ) : (
          "⚡ Summarize"
        )}
      </button>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 mt-4 text-center font-medium">{error}</p>
      )}

      {/* Summary Box */}
      {summary && (
        <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg relative">
          <h4 className="font-semibold text-lg text-indigo-700 dark:text-indigo-300 mb-3">
            📑 Summary
          </h4>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {summary}
          </p>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="absolute top-4 right-4 text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-300 transition"
          >
            {copied ? <ClipboardCheck size={20} /> : <Clipboard size={20} />}
          </button>
        </div>
      )}
    </div>
  );
};

export default Summarization;
