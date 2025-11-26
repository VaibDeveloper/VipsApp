// src/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { readJSON, writeJSON } = require('../utils/fileStore');
const asyncHandler = require('../utils/asyncHandler');
const { generateOTP, verifyOTP } = require('../utils/otp');
const { sendEmail } = require('../utils/email');

const router = express.Router();

function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
}

// POST /api/auth/register
router.post('/register', asyncHandler(async (req, res) => {
  const { fullName, email, password, phone, username } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

  const users = await readJSON('users.json');
  if (users.find((u) => u.email === email.toLowerCase())) return res.status(400).json({ message: 'User exists' });

  const hashed = await bcrypt.hash(password, 10);
  const newUser = {
    id: `u_${Date.now()}`,
    fullName: fullName || '',
    email: email.toLowerCase(),
    phone: phone || '',
    username: username || '',
    password: hashed,
    role: 'student',
    isVerified: false,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  await writeJSON('users.json', users);

  // send OTP (optional)
  const code = generateOTP(email);
  try { await sendEmail(email, 'Your VIPS OTP', `Your OTP: ${code}`); } catch (e) { /* ignore */ }

  res.status(201).json({ message: 'Registered. OTP sent (check email if configured)', user: { id: newUser.id, email: newUser.email } });
}));

// POST /api/auth/login
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const users = await readJSON('users.json');
  const user = users.find((u) => u.email === (email || '').toLowerCase());
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ message: 'Invalid credentials' });

  const token = signToken(user);
  res.json({ token, user: { id: user.id, email: user.email, fullName: user.fullName } });
}));

// POST /api/auth/send-otp
router.post('/send-otp', asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email required' });
  const code = generateOTP(email);
  await sendEmail(email, 'VIPS OTP', `Your OTP: ${code}`);
  res.json({ message: 'OTP sent' });
}));

// POST /api/auth/verify-otp
router.post('/verify-otp', asyncHandler(async (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ message: 'Missing' });
  const ok = verifyOTP(email, code);
  if (!ok) return res.status(400).json({ message: 'Invalid or expired OTP' });

  // mark verified in users.json
  const users = await readJSON('users.json');
  const idx = users.findIndex((u) => u.email === email.toLowerCase());
  if (idx >= 0) { users[idx].isVerified = true; await writeJSON('users.json', users); }
  res.json({ message: 'Verified' });
}));

module.exports = router;
