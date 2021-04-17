import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { authRoutes } from './routes/index.js';
import ErrorWithStatusCode from './utils/ErrorWithStatusCode.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'hello from express' });
});

// Unhandled Endpoint Error
app.get('/*', (req, res, next) => {
  const error = new ErrorWithStatusCode('Page Not Found', 404);
  return next(error);
});

// Global Error Handler
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.status || 500);
  return res.json({
    message: error.message || 'An unexpected error occurred!',
  });
});

export default app;
