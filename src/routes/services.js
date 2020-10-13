const express = require("express");
const {
  getAllService,
  getService,
  addService,
  updateService,
  deleteService
} = require('../controllers/services');
const router = express.Router();

router.get("/", getAllService);
router.get("/:id", getService);
router.post("/", addService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

module.exports = router;