const userModel = require('../models/user');
const { generateToken } = require('../utils/jwt');

async function addUser(req, res) {
  const { username, password } = req.body;

  const existingUser = await userModel.findOne({ username });
  if (existingUser) {
    return res.status(400).json("Username already exist");
  }
  const user = new userModel({
    username,
    password
  });
  await user.hashPassword();
  await user.save();
  const token = generateToken(user._id);
  res.status(201).json(user);
}

module.exports = {
  addUser
};