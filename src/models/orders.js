const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  _id: {
    type: String,
    alias: "orderId"
  },
  serviceTime: {
    type: String,
    required: true
  },
  orderAddress: {
    type: String,
    required: true
  },
  orderMobile: {
    type: String,
    required: true
  },
  orderDesc: {
    type: String
  },
  orderBill: {
    type: String
  },
  orderStatus: {
    type: String,
    required: true
  },
  customer: [{
    type: String, ref: "Customer"
  }]
},{
  toJSON: {
    virtuals: true
  },
  id: false
});

schema.virtual("orderId").get(function () {
  return this._id
})

const Model = mongoose.model("Order", schema);
module.exports = Model;