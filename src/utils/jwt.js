const jwt = require('jsonwebtoken');

function generateToken(id) {
  const token = jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '1h'});
  return token;
}

function validateToken(token) {
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
  return decoded;
}

module.exports = {
  generateToken,
  validateToken
}