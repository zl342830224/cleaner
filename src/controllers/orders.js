const orderModel = require('../models/orders');
const customerModel = require('../models/customer');

async function getAllOrder(req, res) {
  const order = await orderModel.find();
  return res.json(order);
}

async function getOrder(req, res) {
  const { id: orderId } = req.params;
  const order = await orderModel.findById(orderId).populate("customer");
  if (!order) {
    return res.status(404).json("order not found");
  }
  return res.json(order);
}

async function addOrder(req, res) {
  const { orderId, serviceTime, orderAddress, orderMobile, orderDesc, orderBill, orderStatus, customerId } = req.body;
  const order = new orderModel({ orderId, serviceTime, orderAddress, orderMobile, orderDesc, orderBill, orderStatus,});
  const customer = await customerModel.findById(customerId);
  if (!customer) {
    return res.status(404).json("customer not found");
  }
  customer.orders.addToSet(orderId);
  order.customer.addToSet(customerId);
  await customer.save();
  await order.save();
  //想要2个异步同时执行  Promise.all([await customer.save(), await order.save()]);
  return res.status(201).json(order);
}

async function updateOrder(req, res) {
  const { id: orderId } = req.params;
  const { serviceTime, orderAddress, orderMobile, orderDesc, orderBill, orderStatus } = req.body;
  const newOrder = await orderModel.findByIdAndUpdate(
    orderId,
    { serviceTime, orderAddress, orderMobile, orderDesc, orderBill, orderStatus },
    {
      new: true
    }
    );
  if (!newOrder) {
    return res.status(404).json("order not found");
  }
  return res.json(newOrder);
}

async function deleteOrder(req, res) {
  const { id: orderId } = req.params;
  const deletedOrder = await orderModel.findByIdAndDetele(orderId);
  if (!deletedOrder) {
    return res.status(404).json("order not found")
  }
  return res.setStatus(200);
}

module.exports = {
  getAllOrder,
  getOrder,
  addOrder,
  updateOrder,
  deleteOrder
}