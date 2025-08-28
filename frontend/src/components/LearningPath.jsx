import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

export default function LearningPath() {
  const [course, setCourse] = useState("");
  const [path, setPath] = useState(null);
  const [loading, setLoading] = useState(false);

  const generatePath = async () => {
    if (!course.trim()) {
      setPath("⚠️ Please enter a course name.");
      return;
    }

    setLoading(true);
    setPath(null);

    try {
      const prompt = `Create a clean, step-by-step learning path for learning ${course}.
For each step include: Title, Duration, Objective, and Suggested Resources.
Do NOT use markdown (** or *), just plain text.`;

      const res = await axios.post(
        "http://localhost:4000/api/gemini/generate",
        { prompt },
        { headers: { "Content-Type": "application/json" } }
      );

      const rawText =
        res.data?.text ||
        res.data?.output ||
        res.data?.result ||
        res.data?.data?.text ||
        (res.data?.choices?.[0]?.text ?? "");

      if (!rawText) {
        throw new Error("Backend did not return any text");
      }

      const cleaned = rawText.replace(/\*/g, "").trim();
      setPath(cleaned);
    } catch (e) {
      console.error("Error generating learning path:", e);
      setPath("❌ Failed to generate learning path. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const exportPDF = () => {
    if (!path) return;
    const doc = new jsPDF();
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);
    const lines = doc.splitTextToSize(path, 180);
    doc.text(lines, 10, 20);
    doc.save(`${course || "learning-path"}.pdf`);
  };

  const exportWord = async () => {
    if (!path) return;
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [new TextRun({ text: path, size: 24 })],
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${course || "learning-path"}.docx`);
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
        📚 Personalized Learning Path
      </h2>

      {/* Input & Button */}
      <div className="flex w-full gap-2 mb-4">
        <input
          type="text"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          placeholder="Enter a course (e.g. Python, Data Science)"
          className="flex-1 px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={generatePath}
          disabled={loading}
          className="flex-shrink-0 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "..." : "Generate"}
        </button>
      </div>

      {/* Result */}
      <div>
        {loading ? (
          <p className="text-slate-500">Generating your learning path...</p>
        ) : (
          path && (
            <div className="mt-2 p-4 bg-slate-50 border rounded-xl text-sm whitespace-pre-wrap leading-relaxed text-slate-700">
              {path}

              {/* Export Buttons */}
              <div className="mt-4 flex gap-3">
                <button
                  onClick={exportPDF}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Export PDF
                </button>
                <button
                  onClick={exportWord}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Export Word
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
