const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  _id: {
    type: String,
    uppercase: true,
    alias: "businessId"
  },
  nickName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  mobilePhone: {
    type: String,
    required: true
  }
},{
  toJSON: {
    virtuals: true
  },
  id: false
});

schema.virtual("businessId").get(function () {
  return this._id
})

const Model = mongoose.model("Business", schema);
module.exports = Model;