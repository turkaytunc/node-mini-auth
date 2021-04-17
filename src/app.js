import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'hello from express' });
});

export default app;
