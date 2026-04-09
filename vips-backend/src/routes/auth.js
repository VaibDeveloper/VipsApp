// src/routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const { readJSON, writeJSON } = require('../utils/fileStore');
const asyncHandler = require('../utils/asyncHandler');
const { generateOTP, verifyOTP } = require('../utils/otp');
const { sendEmail } = require('../utils/email');

const router = express.Router();

////////////////////////////////////////////////////////////
// 🔐 JWT TOKEN
////////////////////////////////////////////////////////////
function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || "mysupersecretkey",
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

////////////////////////////////////////////////////////////
// ✅ REGISTER (NO PASSWORD)
////////////////////////////////////////////////////////////
router.post('/register', asyncHandler(async (req, res) => {
  const { fullName, email, phone, username } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email required' });
  }

  const users = await readJSON('users.json');

  if (users.find((u) => u.email === email.toLowerCase())) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = {
    id: `u_${Date.now()}`,
    fullName: fullName || '',
    email: email.toLowerCase(),
    phone: phone || '',
    username: username || '',
    password: "", // 🔥 no password initially
    role: 'student',
    isVerified: false,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  await writeJSON('users.json', users);

  // 🔥 GENERATE OTP
  const code = generateOTP(email);

  try {
    await sendEmail(email, 'Your VIPS OTP', `Your OTP: ${code}`);
  } catch (e) {
    console.log("Email error:", e.message);
  }

  console.log("OTP SENT:", code); // 🔥 debug

  res.status(201).json({
    message: 'Registered. OTP sent',
    user: { id: newUser.id, email: newUser.email }
  });
}));

////////////////////////////////////////////////////////////
// 🔥 LOGIN
////////////////////////////////////////////////////////////
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const users = await readJSON('users.json');
  const user = users.find((u) => u.email === (email || '').toLowerCase());

  console.log("USER FOUND:", user);

  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // ❌ block if not verified
  if (!user.isVerified) {
    return res.status(403).json({ message: 'Please verify OTP first' });
  }

  // ❌ block if password not set
  if (!user.password) {
    return res.status(403).json({ message: 'Please set password first' });
  }

  // ❌ wrong password
  if (password !== user.password) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  console.log("PASSWORD MATCHED");

  const token = signToken(user);

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.fullName,
      role: user.role
    }
  });
}));

////////////////////////////////////////////////////////////
// 🔁 SEND OTP
////////////////////////////////////////////////////////////
router.post('/send-otp', asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email required' });
  }

  const code = generateOTP(email);

  try {
    await sendEmail(email, 'VIPS OTP', `Your OTP: ${code}`);
  } catch (e) {
    console.log("Email error:", e.message);
  }

  console.log("OTP RESENT:", code);

  res.json({ message: 'OTP sent' });
}));

////////////////////////////////////////////////////////////
// ✅ VERIFY OTP
////////////////////////////////////////////////////////////
router.post('/verify-otp', asyncHandler(async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const ok = verifyOTP(email, code);

  if (!ok) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  const users = await readJSON('users.json');
  const idx = users.findIndex((u) => u.email === email.toLowerCase());

  if (idx >= 0) {
    users[idx].isVerified = true;
    await writeJSON('users.json', users);
  }

  console.log("OTP VERIFIED:", email);

  res.json({ message: 'OTP verified successfully' });
}));

////////////////////////////////////////////////////////////
// 🔐 SET PASSWORD
////////////////////////////////////////////////////////////
router.post('/set-password', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  // ✅ FIRST declare users
  const users = await readJSON('users.json');

  console.log("SET PASSWORD INPUT:", email);

  // ✅ THEN use it
  const idx = users.findIndex(
    (u) => u.email === email.toLowerCase()
  );

  if (idx === -1) {
    console.log("USER NOT FOUND ❌");
    return res.status(404).json({ message: 'User not found' });
  }

  console.log("UPDATING USER:", users[idx]);

  users[idx].password = password;

  await writeJSON('users.json', users);

  console.log("PASSWORD SET SUCCESS ✅");

  res.json({ message: 'Password set successfully' });
}));

module.exports = router;