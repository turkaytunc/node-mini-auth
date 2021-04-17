import dotenv from 'dotenv';
import app from './src/app.js';

dotenv.config();

const { PORT = 4000 } = process.env;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
