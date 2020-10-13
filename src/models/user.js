const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

schema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, 12);
}

schema.methods.validatePassword = async function (password) {
  //handle error here
  //rerutn true or false
  const validatePassword = await bcrypt.compare(password, this.password);
  return validatePassword;
}
const Model = mongoose.model("User", schema);
module.exports = Model;