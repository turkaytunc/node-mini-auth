import express from 'express';
import { authRoutes } from './routes/index.js';

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'hello from express' });
});

app.use('/auth', authRoutes);

export default app;
