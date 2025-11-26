// src/routes/notifications.js
const express = require('express');
const { readJSON, writeJSON } = require('../utils/fileStore');
const asyncHandler = require('../utils/asyncHandler');
const { protect } = require('../utils/authMiddleware');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const list = await readJSON('notifications.json');
  // force JSON text (UTF-8) — avoids accidentally sending a Buffer with other encoding
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  return res.send(JSON.stringify(list));
  res.json(list.slice().sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)));
}));

router.post('/', protect, asyncHandler(async (req, res) => {
  // in a real app restrict to staff/admin by checking req.user.role
  const { title, body, link, targetRole } = req.body;
  const list = await readJSON('notifications.json');
  const n = { id: `no_${Date.now()}`, title, body, link, targetRole: targetRole || 'all', createdAt: new Date().toISOString(), unread: true };
  list.push(n);
  await writeJSON('notifications.json', list);
  res.status(201).json(n);
}));

router.put('/:id/mark-read', protect, asyncHandler(async (req, res) => {
  const id = req.params.id;
  const list = await readJSON('notifications.json');
  const idx = list.findIndex((x) => x.id === id);
  if (idx >= 0) { list[idx].unread = false; await writeJSON('notifications.json', list); }
  res.json({ success: true });
}));

module.exports = router;
