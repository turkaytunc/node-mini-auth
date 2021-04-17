import express from 'express';

const router = express.Router();

router.post('/register', (req, res) => {
  return res.json({ message: 'auth/register' });
});
router.post('/login', (req, res) => {
  return res.json({ message: 'auth/login' });
});
export default router;
