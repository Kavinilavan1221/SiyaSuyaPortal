const mongoose = require('mongoose');

const passwordResetSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  otpHash: { type: String, required: true },
  attempts: { type: Number, default: 0 },
  requestedAt: { type: Date, required: true },
  expiresAt: { type: Date, required: true, index: { expires: 0 } }
});

module.exports = mongoose.model('PasswordReset', passwordResetSchema);
