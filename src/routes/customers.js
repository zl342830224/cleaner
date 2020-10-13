const express = require('express');
const {
  addCustomer,
  getCustomer,
  getAllCustomer,
  updateCustomer,
  deleteCustomer } = require('../controllers/customers');//从controller引入各种方法function
const router = express.Router();

//对api/customer/路径下再添加子路径
router.get('/', getAllCustomer);
router.get('/:id', getCustomer);
router.post('/', addCustomer);
router.put('/:id',updateCustomer);//put为完整替换 patch为部分替换
router.delete('/:id',deleteCustomer);

module.exports = router