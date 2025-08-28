import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import geminiRouter from "./routes/gemini.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/gemini", geminiRouter);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  console.log("Gemini API Key loaded:", process.env.GEMINI_API_KEY ? "✅ Yes" : "❌ No");
});
