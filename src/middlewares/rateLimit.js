const rateLimit = require('express-rate-limit');

exports.commentRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many comments created from this IP, please try again later.',
});
