import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { authRoutes } from './routes/index.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'hello from express' });
});

export default app;
