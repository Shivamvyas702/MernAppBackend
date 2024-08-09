const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register a new user
router.post('/register', async (req, res) => {
  const { name, email,password } = req.body;
  const newUser = new User({ name,email, password });
  await newUser.save();
  const token = jwt.sign({ id: newUser._id }, 'secret', { expiresIn: '1h' });
  res.json({ token });
});

// Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id ,email: user.email }, 'secret', { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
