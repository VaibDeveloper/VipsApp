// src/routes/assignments.js
const express = require('express');
const { readJSON, writeJSON } = require('../utils/fileStore');
const asyncHandler = require('../utils/asyncHandler');
const { protect } = require('../utils/authMiddleware');

const router = express.Router();

// GET /api/assignments
router.get('/', asyncHandler(async (req, res) => {
  const list = await readJSON('assignments.json');
  // force JSON text (UTF-8) — avoids accidentally sending a Buffer with other encoding
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  return res.send(JSON.stringify(list));
}));

// POST /api/assignments (protected)
router.post('/', protect, asyncHandler(async (req, res) => {
  const { title, subject, description, dueDate } = req.body;
  const list = await readJSON('assignments.json');
  const item = {
    id: `a_${Date.now()}`,
    title, subject, description, dueDate, createdBy: req.user.id, createdAt: new Date().toISOString(), completed: false
  };
  list.push(item);
  await writeJSON('assignments.json', list);
  res.status(201).json(item);
}));

// PUT /api/assignments/:id (protected)
router.put('/:id', protect, asyncHandler(async (req, res) => {
  const id = req.params.id;
  const list = await readJSON('assignments.json');
  const idx = list.findIndex((x) => x.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  list[idx] = { ...list[idx], ...req.body };
  await writeJSON('assignments.json', list);
  res.json(list[idx]);
}));

// DELETE /api/assignments/:id (protected)
router.delete('/:id', protect, asyncHandler(async (req, res) => {
  const id = req.params.id;
  const list = await readJSON('assignments.json');
  const newList = list.filter((x) => x.id !== id);
  await writeJSON('assignments.json', newList);
  res.json({ success: true });
}));

module.exports = router;
