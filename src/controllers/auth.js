const userModel = require('../models/user');
const { generateToken } = require('../utils/jwt');

async function loginUser(req, res) {
  const { username, password } = req.body;
  const existingUser = await userModel.findOne({ username });
  if (!existingUser) {
    return res.status(400).json('Invalid username or password');
  }
  const validatePassword = await existingUser.validatePassword(password);
  if (!validatePassword) {
    return res.status(400).json('Invalid username or password');
  }
  const token = generateToken(existingUser._id);
  return res.json({ token, username })
}

module.exports = {
  loginUser
};