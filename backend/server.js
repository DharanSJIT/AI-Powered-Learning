// 

// MUST import dotenv first
import dotenv from "dotenv";
dotenv.config(); // <-- loads environment variables immediately

import express from "express";
import cors from "cors";
import geminiRouter from "./routes/gemini.js";
import openaiRouter from "./routes/openai.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Configure CORS to allow your frontend
app.use(cors({
  origin: [
    'http://localhost:3000',    // React dev server
    'http://localhost:5173',    // Vite dev server
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use("/api/gemini", geminiRouter);
app.use("/api/openai", openaiRouter);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  console.log("Gemini API Key loaded:", process.env.GEMINI_API_KEY ? "✅ Yes" : "❌ No");
  console.log("OpenAI API Key loaded:", process.env.OPENAI_API_KEY ? "✅ Yes" : "❌ No");
});