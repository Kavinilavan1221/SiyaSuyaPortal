const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
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

router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching inquiries' });
  }
});

router.post('/', async (req, res) => {
  let transporter;
  try {
    transporter = createSmtpTransporter();
  } catch (error) {
    console.error('Inquiry email configuration error:', error);
    return res.status(503).json({ error: 'Inquiry email notifications are not configured.' });
  }

  let inquiry;
  try {
    inquiry = new Inquiry(req.body);
    await inquiry.save();
  } catch (error) {
    console.error('Error saving inquiry:', error);
    res.status(400).json({ error: 'Bad request creating inquiry' });
    return;
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: COMPANY_EMAIL,
      replyTo: inquiry.email,
      subject: `New inquiry from ${inquiry.name} | Siya Suya International`,
      text: [
        'New customer inquiry received.',
        '',
        'Customer details:',
        `Name: ${inquiry.name}`,
        `Company: ${inquiry.company || 'Not provided'}`,
        `Email: ${inquiry.email}`,
        `Country: ${inquiry.country || 'Not provided'}`,
        `Submitted: ${new Date(inquiry.createdAt || Date.now()).toLocaleString()}`,
        '',
        'Inquiry message:',
        inquiry.message || 'Not provided'
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937; background-color: #f8fafc; padding: 32px;">
          <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #0f172a, #1e293b); color: #ffffff; padding: 24px 32px;">
              <h2 style="margin: 0; font-size: 24px;">New Customer Inquiry</h2>
              <p style="margin: 10px 0 0; font-size: 14px; opacity: 0.9;">Siya Suya International</p>
            </div>

            <div style="padding: 28px 32px 16px;">
              <p style="margin: 0 0 18px; font-size: 16px;">A new quote or inquiry request has been submitted through the website.</p>

              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 8px 0; font-weight: 700; width: 140px; color: #374151;">Customer Name</td>
                  <td style="padding: 8px 0; color: #111827;">${inquiry.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: 700; color: #374151;">Company</td>
                  <td style="padding: 8px 0; color: #111827;">${inquiry.company || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: 700; color: #374151;">Email</td>
                  <td style="padding: 8px 0; color: #111827;">${inquiry.email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: 700; color: #374151;">Country</td>
                  <td style="padding: 8px 0; color: #111827;">${inquiry.country || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: 700; color: #374151;">Submitted</td>
                  <td style="padding: 8px 0; color: #111827;">${new Date(inquiry.createdAt || Date.now()).toLocaleString()}</td>
                </tr>
              </table>

              <div style="margin-top: 24px;">
                <p style="margin: 0 0 10px; font-weight: 700; color: #374151;">Inquiry Details</p>
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #1f2937; white-space: pre-wrap;">
                  ${inquiry.message || 'Not provided'}
                </div>
              </div>
            </div>

            <div style="padding: 0 32px 28px;">
              <p style="margin: 0; font-size: 13px; color: #6b7280;">
                Please respond to this customer using the email address above.
              </p>
            </div>
          </div>
        </div>
      `
    });
  } catch (error) {
    console.error('Error sending inquiry notification email:', error);
    return res.status(502).json({
      error: 'Your inquiry was saved, but its email notification could not be delivered.'
    });
  }

  res.status(201).json(inquiry);
});

router.put('/:id', async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(inquiry);
  } catch (error) {
    res.status(400).json({ error: 'Bad request updating inquiry' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Inquiry deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error deleting inquiry' });
  }
});

module.exports = router;
