const { validateToken } = require('../utils/jwt');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];//header('authorization')
  if (!authHeader) {
    return res.status(401).json('Access Denied');
  }
  const contentArray = authHeader.split(' ');
  if (contentArray.length !== 2 || contentArray[0] !== 'Bearer') {
    return res.status(401).json('Invalid token format');
  }

  const decoded = validateToken(contentArray[1]);
  if (!decoded) {
    return res.status(401).json('Access Denied');
  }
  req.user = decoded;
  return next();
}