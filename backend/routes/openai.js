// routes/openai.js
import express from 'express';
import axios from 'axios';

const router = express.Router();

// POST route for summarization using OpenAI
router.post('/summarize', async (req, res) => {
  const { text } = req.body;

  // Check if text is provided
  if (!text) {
    return res.status(400).send({ error: 'Text is required for summarization.' });
  }

  try {
    // Send request to OpenAI API
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: 'gpt-4',  // Or 'gpt-3.5-turbo'
      prompt: `Summarize the following text:\n\n${text}`,
      max_tokens: 100, // Adjust as needed
      temperature: 0.7, // Adjust randomness
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      }
    });

    // Get the summarized text
    const summary = response.data.choices[0].text.trim();
    
    // Send the summary back to the client
    res.json({ summary });
  } catch (error) {
    console.error("Error with OpenAI API:", error.response ? error.response.data : error.message);
    res.status(500).send({ error: 'Failed to summarize text using OpenAI.' });
  }
});

export default router;
