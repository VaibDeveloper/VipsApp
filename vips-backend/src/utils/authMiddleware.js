// src/utils/authMiddleware.js
const jwt = require('jsonwebtoken');
const { readJSON } = require('./fileStore');

async function protect(req, res, next) {
  try {
    const auth = req.headers.authorization;
    const token = auth && auth.startsWith('Bearer ') ? auth.split(' ')[1] : null;
    if (!token) return res.status(401).json({ message: 'Not authorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // look up user in users.json
    const users = await readJSON('users.json');
    const user = users.find((u) => u.id === decoded.id);
    if (!user) return res.status(401).json({ message: 'No user' });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized' });
  }
}

module.exports = { protect };
