const express = require('express');
const {
  getAllOrder,
  getOrder,
  addOrder,
  updateOrder,
  deleteOrder
} = require('../controllers/orders');
const { modelName } = require('../models/orders');

const router = express.Router();

router.get('/', getAllOrder);
router.get('/:id', getOrder);
router.post('/', addOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
