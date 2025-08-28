import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function QuizGenerator() {
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const number = 5;

  const generateQuiz = async () => {
    if (!topic) {
      setQuiz("⚠️ Please enter a topic to generate quiz.");
      return;
    }

    setLoading(true);
    setAnswers({});
    try {
      const prompt = `Generate a ${number}-question multiple-choice quiz on ${topic}.
      Each question should have exactly 4 options and 1 correct answer.
      Return ONLY valid JSON in this format (no extra text, no markdown):
      [
        {
          "question": "What is React?",
          "options": ["A library", "A framework", "A language", "A database"],
          "answer": "A library"
        }
      ]`;

      const res = await axios.post("http://localhost:4000/api/gemini/generate", { prompt });

      let text = res.data.text.trim();
      text = text.replace(/```json/gi, "").replace(/```/g, "").trim();

      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch (err) {
        console.error("Parsing error:", err, text);
        setQuiz("⚠️ Failed to parse quiz. Try again.");
        setLoading(false);
        return;
      }

      setQuiz(parsed);
    } catch (e) {
      console.error("Quiz error:", e);
      setQuiz("❌ Failed to generate quiz");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (qIndex, option) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: option }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto mt-[20px]">
      {/* 🔙 Back to Dashboard */}
      <Link
        to="/home"
        className="inline-block mb-4 text-sm text-blue-600 hover:underline"
      >
        ← Back to Dashboard
      </Link>

      {/* Header */}
      <h2 className="font-bold text-2xl text-slate-800 mb-4 flex items-center gap-2">
        📝 Quiz Generator
      </h2>

      {/* Input + Button */}
      <div className="flex w-full gap-2 mb-4">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic (e.g. JavaScript, Machine Learning)"
          className="flex-1 px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={generateQuiz}
          disabled={loading}
          className="flex-shrink-0 px-5 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "..." : "Generate"}
        </button>
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex items-center gap-2 text-slate-500 mb-4">
          <svg
            className="animate-spin h-5 w-5 text-green-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          Generating your quiz...
        </div>
      )}

      {/* Quiz */}
      {Array.isArray(quiz) && quiz.length > 0 && (
        <div className="space-y-6">
          {quiz.map((q, i) => (
            <div key={i} className="p-4 border rounded-xl bg-slate-50 shadow-sm">
              <p className="font-medium mb-3 text-slate-800">
                {i + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, j) => {
                  const selected = answers[i];
                  const isCorrect = selected && opt === q.answer;
                  const isWrong = selected === opt && selected !== q.answer;

                  return (
                    <button
                      key={j}
                      onClick={() => handleAnswer(i, opt)}
                      disabled={!!selected} // disable after choosing
                      className={`block w-full text-left px-4 py-2 rounded-lg border transition 
                        ${
                          isCorrect
                            ? "bg-green-100 border-green-600 text-green-800"
                            : isWrong
                            ? "bg-red-100 border-red-600 text-red-800"
                            : "hover:bg-slate-100 border-slate-300"
                        }`}
                    >
                      {opt}
                      {isCorrect && " ✅"}
                      {isWrong && " ❌"}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Errors / Messages */}
      {!loading && typeof quiz === "string" && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {quiz}
        </div>
      )}
    </div>
  );
}
