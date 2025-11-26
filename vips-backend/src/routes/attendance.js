// src/routes/attendance.js
const express = require('express');
const { readJSON, writeJSON } = require('../utils/fileStore');
const asyncHandler = require('../utils/asyncHandler');
const { protect } = require('../utils/authMiddleware');

const router = express.Router();

// GET my attendance
router.get('/my', protect, asyncHandler(async (req, res) => {
  const all = await readJSON('attendance.json');
  const mine = all.filter((a) => a.user === req.user.id);
  res.json(mine);
}));

// POST create/update for current user
router.post('/', protect, asyncHandler(async (req, res) => {
  const { subject, percentage, records } = req.body;
  const all = await readJSON('attendance.json');
  const idx = all.findIndex((a) => a.user === req.user.id && a.subject === subject);
  if (idx >= 0) {
    all[idx] = { ...all[idx], percentage, records, updatedAt: new Date().toISOString() };
  } else {
    all.push({ id: `att_${Date.now()}`, user: req.user.id, subject, percentage, records: records || [], updatedAt: new Date().toISOString() });
  }
  await writeJSON('attendance.json', all);
  res.json({ success: true });
}));

module.exports = router;
