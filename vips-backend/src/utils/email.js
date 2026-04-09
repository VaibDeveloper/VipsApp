const nodemailer = require('nodemailer');

const configured = !!process.env.EMAIL_HOST;

const transporter = configured ? nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT || 587),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
}) : null;

async function sendEmail(to, subject, text) {
  if (!transporter) {
  console.log("OTP (DEV MODE):", text);
  return;
}
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
}

module.exports = { sendEmail };
