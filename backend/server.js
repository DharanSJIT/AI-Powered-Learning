console.log("Server is starting...");

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import geminiRouter from './routes/gemini.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.use('/api/gemini', geminiRouter);

app.get('/', (req, res) => res.send({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
