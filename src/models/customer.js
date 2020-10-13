const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
//只有在.save()的时候，才会触发model定义字段时的validation
const schema = new mongoose.Schema({
  _id: {
    type: String,
    uppercase: true,//当存入数据时，如何传入的时abc，会自动变成ABC
    alias: "customerId"//如何用户传入customerId字段，也能识别
  },
  nickName: {
    type: String,
    minlength: [2, "we need at least 2 words"],
    required: [true, "we need nickName"]//这里用数组，可以自定义error message
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (email) => {
        return !Joi.string().email().validate(email).error//arrow function如何直接return的话可以省略{}和return
      },//这里传入一个function，一般用arrow function,return true代表验证通过，false代表不通过
      msg: "Invalid email format"//当validator不通过时，抛出msg
    }
    //使用[{validator:XXX},{validator:XXX},{validator:XXX}]可以做多个validator
  },
  mobilePhone: {
    type: String,
    required: true
  },
  address: {
    type: String,
  },
  __v: {
    type: Number,
    select: false
  },
  orders: [//1对多用[],1对1用{ }
    {type: String, ref: 'Order'}  //如果order这个connention的type为object Id 则用type: mongoose.Schema.Types.ObjectId
  ]
  
}, {
  toJSON: {
    virtuals: true
  },
  // timestamps: true,//返回时间戳
  id: false//不返回id
});
// 这里上下是隐藏属性，有一个customerId的隐藏属性，设置为true时会在json中返回
schema.virtual("customerId").get(function () {
  return this._id
})

//这里的Cuctomer是model的名字，对应是数据库中会新建一个这里Customer名字对应复数的connection
const Model = mongoose.model('Customer', schema);
module.exports= Model;