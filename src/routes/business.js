const express = require('express');
const {
  getBusiness,
  getAllBusiness,
  addBusiness,
  updateBusiness,
  deleteBusiness
} = require('../controllers/business');

const router = express.Router();

router.get('/:id', getBusiness);
router.get('/', getAllBusiness);
router.post('/', addBusiness);
router.put('/:id', updateBusiness);
router.delete('/:id', deleteBusiness);

module.exports = router;