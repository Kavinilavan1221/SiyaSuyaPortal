const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const COMPANY_EMAIL = process.env.COMPANY_EMAIL || 'siyani.2111@gmail.com';

function createSmtpTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP_HOST, SMTP_USER, and SMTP_PASS must be configured');
  }

  const port = Number(SMTP_PORT || 465);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('SMTP_PORT must be a valid port number');
  }
  if (SMTP_SECURE && !['true', 'false'].includes(SMTP_SECURE.toLowerCase())) {
    throw new Error('SMTP_SECURE must be true or false');
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: SMTP_SECURE ? SMTP_SECURE.toLowerCase() === 'true' : port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });
}

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Name, email, subject, and message are required.' });
  }

  let transporter;
  try {
    transporter = createSmtpTransporter();
  } catch (error) {
    console.error('Contact email configuration error:', error);
    return res.status(503).json({ error: 'Contact email notifications are not configured.' });
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: COMPANY_EMAIL,
      replyTo: email,
      subject: `New Contact Message from ${name} | Siya Suya International`,
      text: [
        'New website contact message received.',
        '',
        'Contact details:',
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        `Submitted: ${new Date().toLocaleString()}`,
        '',
        'Message:',
        message
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937; background-color: #f8fafc; padding: 32px;">
          <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #0f172a, #1e293b); color: #ffffff; padding: 24px 32px;">
              <h2 style="margin: 0; font-size: 24px;">New Contact Message</h2>
              <p style="margin: 10px 0 0; font-size: 14px; opacity: 0.9;">Siya Suya International</p>
            </div>
            <div style="padding: 28px 32px 16px;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 8px 0; font-weight: 700; width: 140px; color: #374151;">Name</td>
                  <td style="padding: 8px 0; color: #111827;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: 700; color: #374151;">Email</td>
                  <td style="padding: 8px 0; color: #111827;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: 700; color: #374151;">Subject</td>
                  <td style="padding: 8px 0; color: #111827;">${subject}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: 700; color: #374151;">Submitted</td>
                  <td style="padding: 8px 0; color: #111827;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
              <div style="margin-top: 24px;">
                <p style="margin: 0 0 10px; font-weight: 700; color: #374151;">Message</p>
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #1f2937; white-space: pre-wrap;">${message}</div>
              </div>
            </div>
            <div style="padding: 0 32px 28px;">
              <p style="margin: 0; font-size: 13px; color: #6b7280;">Please reply to this customer using the email address above.</p>
            </div>
          </div>
        </div>
      `
    });

    res.status(200).json({ message: 'Contact message sent successfully.' });
  } catch (error) {
    console.error('Error sending contact notification email:', error);
    return res.status(502).json({
      error: 'Your message could not be delivered. Please try again later.'
    });
  }
});

module.exports = router;
