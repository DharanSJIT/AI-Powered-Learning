// import express from 'express';
// import dotenv from 'dotenv';


// dotenv.config();
// const router = express.Router();


// // Using the Google Gen AI SDK
// import { GoogleGenAI } from '@google/genai';


// const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


// // A simple endpoint to generate recommendations / chat responses.
// router.post('/generate', async (req, res) => {
// try {
// const { prompt, mode = 'chat' } = req.body;


// if (!prompt) return res.status(400).json({ error: 'Missing prompt' });


// // Example: a lightweight chat/completion call — adapt model and params as needed
// const response = await client.responses.create({
// model: 'gpt-4o-mini', // replace with the Gemini model name you want (e.g. gemini-2.5) or keep as-is
// input: prompt,
// temperature: 0.2,
// maxOutputTokens: 600
// });


// // `response` shape depends on SDK version; return safe subset
// return res.json({ raw: response, text: response.output?.[0]?.content?.[0]?.text ?? JSON.stringify(response) });
// } catch (err) {
// console.error('Gemini error:', err?.message || err);
// return res.status(500).json({ error: 'Gemini request failed', details: String(err) });
// }
// });


// export default router;

import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);

    res.json({ text: result.response.text() });
  } catch (err) {
    console.error("Gemini error:", err);
    res
      .status(500)
      .json({ error: "Gemini request failed", details: String(err) });
  }
});

export default router;
