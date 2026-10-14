const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'siyasuya_super_secret_jwt_key_2026';

module.exports = function requireAdmin(req, res, next) {
  const authorization = req.headers.authorization;
  const token = authorization && authorization.startsWith('Bearer ')
    ? authorization.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({ error: 'Authentication is required.' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload.role !== 'admin') {
      return res.status(403).json({ error: 'Administrator access is required.' });
    }
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Your session is invalid or expired. Please sign in again.' });
  }
};
