import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './src/app.js';

dotenv.config();

const { PORT = 4000, DB_URL } = process.env;

mongoose.connect(
  DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('DB connected');

    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  },
);
