const otpMap = new Map();

// 🔥 Generate OTP (default 4-digit)
function generateOTP(email, length = 4, ttlSeconds = 300) {
  // ensure 4-digit OTP (1000–9999)
  const code =
    length === 4
      ? Math.floor(1000 + Math.random() * 9000).toString()
      : String(Math.floor(Math.random() * 10 ** length)).padStart(length, "0");

  const expiresAt = Date.now() + ttlSeconds * 1000;

  otpMap.set(email.toLowerCase(), { code, expiresAt });

  // 🔥 DEV MODE (optional - helps debugging)
  console.log(`OTP for ${email}: ${code}`);

  return code;
}

// 🔥 Verify OTP
function verifyOTP(email, code) {
  const key = email.toLowerCase();
  const rec = otpMap.get(key);

  if (!rec) return false;

  // ❌ expired
  if (Date.now() > rec.expiresAt) {
    otpMap.delete(key);
    return false;
  }

  // ✅ correct OTP
  if (String(rec.code) === String(code)) {
    otpMap.delete(key); // remove after success
    return true;
  }

  return false;
}

module.exports = { generateOTP, verifyOTP };