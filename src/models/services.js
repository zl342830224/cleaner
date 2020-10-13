const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  _id: {
    type: String,
    alias: "serviceId"
  },
  serviceName: {
    type: String,
    required: true
  },
  serviceType: {
    type: String,
    required: true
  },
  servicePrice: {
    type: String,
    required: true
  }
},{
  toJSON: {
    virtuals: true,
  },
  id: false
});

schema.virtual("serviceId").get(function () {
  return this._id
})

const Model = mongoose.model("Service", schema);
module.exports = Model;