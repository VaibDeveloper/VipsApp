// src/utils/otp.js
const otpMap = new Map();

function generateOTP(email, length = 6, ttlSeconds = 300) {
  const code = String(Math.floor(Math.random() * 10 ** length)).padStart(length, '0');
  const expiresAt = Date.now() + ttlSeconds * 1000;
  otpMap.set(email.toLowerCase(), { code, expiresAt });
  return code;
}

function verifyOTP(email, code) {
  const rec = otpMap.get(email.toLowerCase());
  if (!rec) return false;
  if (Date.now() > rec.expiresAt) { otpMap.delete(email.toLowerCase()); return false; }
  if (String(rec.code) === String(code)) { otpMap.delete(email.toLowerCase()); return true; }
  return false;
}

module.exports = { generateOTP, verifyOTP };
