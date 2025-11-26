// src/routes/notes.js
const express = require('express');
const { readJSON, writeJSON } = require('../utils/fileStore');
const asyncHandler = require('../utils/asyncHandler');
const { protect } = require('../utils/authMiddleware');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const list = await readJSON('notes.json');
  // force JSON text (UTF-8) — avoids accidentally sending a Buffer with other encoding
  res.setHeader('Content-Type', 'notes/json; charset=utf-8');
  return res.send(JSON.stringify(list));
}));

router.post('/', protect, asyncHandler(async (req, res) => {
  const { title, subject, fileUrl, description } = req.body;
  const list = await readJSON('notes.json');
  const item = { id: `n_${Date.now()}`, title, subject, fileUrl, description, uploadedBy: req.user.id, uploadedAt: new Date().toISOString() };
  list.push(item);
  await writeJSON('notes.json', list);
  res.status(201).json(item);
}));

router.delete('/:id', protect, asyncHandler(async (req, res) => {
  const id = req.params.id;
  const list = await readJSON('notes.json');
  await writeJSON('notes.json', list.filter((x) => x.id !== id));
  res.json({ success: true });
}));

module.exports = router;
