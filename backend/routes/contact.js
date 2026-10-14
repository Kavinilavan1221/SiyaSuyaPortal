const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const ContactMessage = require('../models/ContactMessage');
const requireAdmin = require('../middleware/requireAdmin');

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

router.get('/messages', requireAdmin, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ error: 'Unable to load contact messages.' });
  }
});

router.put('/messages/:id', requireAdmin, async (req, res) => {
  const { status } = req.body || {};
  if (!['New', 'Replied'].includes(status)) {
    return res.status(400).json({ error: 'Status must be New or Replied.' });
  }

  try {
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!message) {
      return res.status(404).json({ error: 'Contact message not found.' });
    }
    res.json(message);
  } catch (error) {
    console.error('Error updating contact message:', error);
    res.status(400).json({ error: 'Unable to update contact message.' });
  }
});

router.delete('/messages/:id', requireAdmin, async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ error: 'Contact message not found.' });
    }
    res.json({ message: 'Contact message deleted.' });
  } catch (error) {
    console.error('Error deleting contact message:', error);
    res.status(400).json({ error: 'Unable to delete contact message.' });
  }
});

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof subject !== 'string' ||
    typeof message !== 'string' ||
    name.trim().length < 2 ||
    name.trim().length > 120 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
    subject.trim().length < 5 ||
    subject.trim().length > 200 ||
    message.trim().length < 10 ||
    message.trim().length > 5000
  ) {
    return res.status(400).json({ error: 'Name, email, subject, and message are required.' });
  }

  try {
    const contactMessage = await ContactMessage.create({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim()
    });

    try {
      const transporter = createSmtpTransporter();
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: COMPANY_EMAIL,
        replyTo: contactMessage.email,
        subject: `New Contact Message from ${contactMessage.name} | Siya Suya International`,
        text: [
          'New website contact message received.',
          '',
          'Contact details:',
          `Name: ${contactMessage.name}`,
          `Email: ${contactMessage.email}`,
          `Subject: ${contactMessage.subject}`,
          `Submitted: ${new Date(contactMessage.createdAt).toLocaleString()}`,
          '',
          'Message:',
          contactMessage.message
        ].join('\n')
      });

      return res.status(201).json({
        message: 'Your message has been received. Our team has been notified.',
        emailSent: true
      });
    } catch (error) {
      console.error('Contact message saved, but email notification failed:', error);
      return res.status(201).json({
        message: 'Your message was received and saved, but the email notification could not be sent. Our team can view it in the portal.',
        emailSent: false
      });
    }
  } catch (error) {
    console.error('Error saving contact message:', error);
    return res.status(500).json({ error: 'Your message could not be saved. Please try again later.' });
  }
});

module.exports = router;
