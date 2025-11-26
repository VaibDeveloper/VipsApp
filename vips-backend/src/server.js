// src/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const assignmentsRoutes = require('./routes/assignments');
const notesRoutes = require('./routes/notes');
const attendanceRoutes = require('./routes/attendance');
const notificationsRoutes = require('./routes/notifications');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// mount routes
app.use('/api/auth', authRoutes);
app.use('/api/assignments', assignmentsRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/notifications', notificationsRoutes);

// add near top of src/server.js (temporary test route)
app.get('/_debug/test-json', (req, res) => {
  res.json({ ok: true, ts: Date.now() });
});


// basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
