require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const path = require('path');
const { createHash, randomInt, timingSafeEqual } = require('crypto');

const User = require('./models/User');
const PasswordReset = require('./models/PasswordReset');

const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = process.env.JWT_SECRET || 'siyasuya_super_secret_jwt_key_2026';
const COMPANY_EMAIL = process.env.COMPANY_EMAIL || 'siyasuyainternationalpvt@gmail.com';
const PASSWORD_RESET_TTL_MS = 10 * 60 * 1000;
const PASSWORD_RESET_COOLDOWN_MS = 60 * 1000;
const PASSWORD_RESET_MAX_ATTEMPTS = 5;

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

function hashResetOtp(email, otp) {
  return createHash('sha256').update(`${JWT_SECRET}:${email}:${otp}`).digest('hex');
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

// Connect to MongoDB
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err.message));
} else {
  console.warn('⚠️  MONGODB_URI is not set in backend/.env. MongoDB features will be disabled until configured.');
}

// Routes
const productRoutes = require('./routes/products');
const inquiryRoutes = require('./routes/inquiries');
const contactRoutes = require('./routes/contact');
app.use('/api/products', productRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/contact', contactRoutes);

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    const user = new User({ name, email, password });
    await user.save();

    let welcomeEmailSent = false;
    try {
      const transporter = createSmtpTransporter();
      const safeName = escapeHtml(name);
      await transporter.sendMail({
        from: `"Siya Suya International" <${process.env.SMTP_USER}>`,
        to: user.email,
        subject: 'Welcome to Siya Suya International',
        text: [
          `Hello ${name},`,
          '',
          'Welcome to Siya Suya International. Your portal account has been created successfully.',
          'You can now sign in to access your account and explore our seafood export catalog.',
          '',
          'If you did not create this account, please contact us at siyasuyainternationalpvt@gmail.com.',
          '',
          'Warm regards,',
          'Siya Suya International',
          'Sri Lankan Seafood Export'
        ].join('\n'),
        html: `
          <!doctype html>
          <html lang="en">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <title>Welcome to Siya Suya International</title>
            </head>
            <body style="margin:0;padding:32px 12px;background-color:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#172554;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">
                <tr>
                  <td style="padding:28px 32px;background-color:#0a192f;text-align:center;">
                    <img src="cid:siyasuya-logo" width="76" height="76" alt="Siya Suya International logo" style="display:block;width:76px;height:76px;object-fit:cover;border:0;border-radius:50%;margin:0 auto 14px;background:#ffffff;">
                    <div style="font-size:20px;font-weight:700;letter-spacing:.3px;color:#ffffff;">Siya Suya International</div>
                    <div style="margin-top:6px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#7dd3fc;">Seafood Export</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:36px 32px 12px;">
                    <div style="margin-bottom:12px;font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0284c7;">Welcome aboard</div>
                    <h1 style="margin:0 0 16px;font-size:26px;line-height:1.3;color:#0f172a;">Welcome, ${safeName}!</h1>
                    <p style="margin:0;font-size:15px;line-height:1.8;color:#475569;">
                      Thank you for joining Siya Suya International. Your portal account has been created successfully.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 32px 28px;">
                    <div style="padding:20px;border:1px solid #e2e8f0;border-radius:12px;background-color:#f8fafc;">
                      <div style="font-size:15px;font-weight:700;color:#0f172a;">Your account is ready</div>
                      <p style="margin:8px 0 0;font-size:14px;line-height:1.7;color:#475569;">
                        Sign in to explore our seafood export catalog and get in touch with our team about products and quotations.
                      </p>
                    </div>
                    <p style="margin:22px 0 0;font-size:13px;line-height:1.7;color:#64748b;">
                      If you did not create this account, please contact us at
                      <a href="mailto:siyasuyainternationalpvt@gmail.com" style="color:#0369a1;text-decoration:underline;">siyasuyainternationalpvt@gmail.com</a>.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 32px;background-color:#f8fafc;text-align:center;">
                    <p style="margin:0;font-size:12px;color:#64748b;">Warm regards,<br><strong style="color:#334155;">Siya Suya International</strong><br>Sri Lankan Seafood Export</p>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `,
        attachments: [{
          filename: 'logo.jpeg',
          path: path.join(__dirname, '..', 'frontend', 'public', 'logo.jpeg'),
          cid: 'siyasuya-logo'
        }]
      });
      welcomeEmailSent = true;
    } catch (emailError) {
      console.error('Account created, but welcome email delivery failed:', emailError);
    }
    
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      welcomeEmailSent
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, requireAdmin } = req.body;
    
    // Master Admin Bypass
    if (email === 'admin123@gmail.com' && password === 'admin123') {
      const token = jwt.sign({ userId: 'master-admin', role: 'admin' }, JWT_SECRET, { expiresIn: '1d' });
      return res.json({ token, user: { id: 'master-admin', name: 'Admin', email, role: 'admin' } });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const userRole = (user.email === 'admin123@gmail.com') ? 'admin' : 'customer';
    const userName = (userRole === 'admin' && (user.name === 'Super Admin' || user.name === 'Super')) ? 'Admin' : user.name;
    
    const token = jwt.sign({ userId: user._id, role: userRole }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: userName, email: user.email, role: userRole } });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

app.post('/api/auth/forgot-password/request-otp', async (req, res) => {
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Enter a valid email address.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: 'No account is registered with this email address. Please check the email or create an account.'
      });
    }

    const now = new Date();
    const existingReset = await PasswordReset.findOne({ email });
    if (existingReset && now.getTime() - existingReset.requestedAt.getTime() < PASSWORD_RESET_COOLDOWN_MS) {
      return res.json({ message: 'A reset code was recently sent. Please check your email.' });
    }

    const otp = randomInt(100000, 1000000).toString();
    const expiresAt = new Date(now.getTime() + PASSWORD_RESET_TTL_MS);
    const reset = await PasswordReset.findOneAndUpdate(
      { email },
      { email, otpHash: hashResetOtp(email, otp), attempts: 0, requestedAt: now, expiresAt },
      { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
    );

    try {
      const transporter = createSmtpTransporter();
      await transporter.sendMail({
        from: `"Siya Suya International" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Password reset code | Siya Suya International',
        text: [
          'Siya Suya International',
          '',
          'We received a request to reset the password for your account.',
          '',
          `Your one-time verification code is ${otp}.`,
          '',
          'This code expires in 10 minutes and can only be used once.',
          'If you did not request this code, you can ignore this email. Your password will remain unchanged.'
        ].join('\n'),
        html: `
          <!doctype html>
          <html lang="en">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <title>Password reset code</title>
            </head>
            <body style="margin:0;padding:32px 12px;background-color:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#172554;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">
                <tr>
                  <td style="padding:28px 32px;background-color:#0a192f;text-align:center;">
                    <img src="cid:siyasuya-logo" width="76" height="76" alt="Siya Suya International logo" style="display:block;width:76px;height:76px;object-fit:cover;border:0;border-radius:50%;margin:0 auto 14px;background:#ffffff;">
                    <div style="font-size:20px;font-weight:700;letter-spacing:.3px;color:#ffffff;">Siya Suya International</div>
                    <div style="margin-top:6px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#7dd3fc;">Seafood Export</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:36px 32px 16px;">
                    <h1 style="margin:0 0 14px;font-size:24px;line-height:1.3;color:#0f172a;">Reset your password</h1>
                    <p style="margin:0;font-size:15px;line-height:1.7;color:#475569;">
                      We received a request to reset the password for your Siya Suya account. Enter this one-time verification code to continue:
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 32px 24px;">
                    <div style="padding:20px 16px;border:1px solid #bae6fd;border-radius:12px;background-color:#f0f9ff;text-align:center;">
                      <div style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0369a1;">Your verification code</div>
                      <div style="margin-top:10px;font-size:36px;font-weight:700;letter-spacing:10px;color:#0f172a;">${otp}</div>
                    </div>
                    <p style="margin:18px 0 0;text-align:center;font-size:13px;line-height:1.6;color:#64748b;">
                      This code expires in <strong style="color:#334155;">10 minutes</strong> and can only be used once.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 32px 32px;">
                    <div style="padding-top:20px;border-top:1px solid #e2e8f0;">
                      <p style="margin:0;font-size:13px;line-height:1.7;color:#64748b;">
                        If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 32px;background-color:#f8fafc;text-align:center;">
                    <p style="margin:0;font-size:12px;color:#64748b;">Siya Suya International · Sri Lankan Seafood Export</p>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `,
        attachments: [{
          filename: 'logo.jpeg',
          path: path.join(__dirname, '..', 'frontend', 'public', 'logo.jpeg'),
          cid: 'siyasuya-logo'
        }]
      });
    } catch (error) {
      await PasswordReset.deleteOne({ _id: reset._id });
      console.error('Password reset OTP email delivery failed:', error);
      return res.status(503).json({ error: 'We could not send the reset code right now. Please try again later.' });
    }

    return res.json({ message: 'A reset code has been sent to your email address.' });
  } catch (error) {
    console.error('Password reset OTP request failed:', error);
    return res.status(500).json({ error: 'Unable to process your password reset request.' });
  }
});

app.post('/api/auth/forgot-password/reset', async (req, res) => {
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const otp = typeof req.body?.otp === 'string' ? req.body.otp.trim() : '';
  const newPassword = typeof req.body?.newPassword === 'string' ? req.body.newPassword : '';

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Enter a valid email address.' });
  }
  if (!/^\d{6}$/.test(otp)) {
    return res.status(400).json({ error: 'Enter the six-digit reset code.' });
  }
  if (newPassword.length < 8 || newPassword.length > 128) {
    return res.status(400).json({ error: 'Your new password must be between 8 and 128 characters.' });
  }

  try {
    const reset = await PasswordReset.findOne({ email });
    const providedHash = hashResetOtp(email, otp);
    const isValid = reset &&
      reset.expiresAt > new Date() &&
      reset.attempts < PASSWORD_RESET_MAX_ATTEMPTS &&
      timingSafeEqual(Buffer.from(providedHash, 'hex'), Buffer.from(reset.otpHash, 'hex'));

    if (!isValid) {
      if (reset && reset.expiresAt > new Date()) {
        const updatedReset = await PasswordReset.findByIdAndUpdate(
          reset._id,
          { $inc: { attempts: 1 } },
          { new: true }
        );
        if (updatedReset && updatedReset.attempts >= PASSWORD_RESET_MAX_ATTEMPTS) {
          await PasswordReset.deleteOne({ _id: reset._id });
        }
      }
      return res.status(400).json({ error: 'The reset code is invalid or expired. Request a new code and try again.' });
    }

    const consumedReset = await PasswordReset.findOneAndDelete({
      _id: reset._id,
      otpHash: reset.otpHash,
      expiresAt: { $gt: new Date() },
      attempts: { $lt: PASSWORD_RESET_MAX_ATTEMPTS }
    });
    if (!consumedReset) {
      return res.status(400).json({ error: 'The reset code is invalid or expired. Request a new code and try again.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.error('Password reset account disappeared after OTP verification.');
      return res.status(500).json({ error: 'Unable to reset the password. Please request a new code.' });
    }

    user.password = newPassword;
    await user.save();
    return res.json({ message: 'Your password has been reset. You can now sign in.' });
  } catch (error) {
    console.error('Password reset failed:', error);
    return res.status(500).json({ error: 'Unable to reset your password. Please try again later.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
