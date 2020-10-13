const businessModel = require('../models/business');

async function getBusiness(req, res) {
  const { id: businessId } = req.params;
  const business = await businessModel.findById(businessId);
  if (!business) {
    return res.status(404).json("business not found")
  }
  return res.json(business);
}

async function getAllBusiness(req, res) {
  const business = await businessModel.find();
  return res.json(business);
}

async function addBusiness(req, res) {
  const { businessId, nickName, email, address, mobilePhone } = req.body;
  const business = new businessModel({ businessId, nickName, email, address, mobilePhone });
  await business.save();
  return res.json(business);
}

async function updateBusiness(req, res) {
  const { id: businessId } = req.params;
  const { nickName, email, address, mobilePhone } = req.body;
  const newBusiness = await businessModel.findByIdAndUpdate(
    businessId,
    { nickName, email, address, mobilePhone },
    { new: true }
    );
  if (!newBusiness) {
    return res.status(404).json("business not found");
  }
  return res.json(newBusiness);
}

async function deleteBusiness(req, res) {
  const { id: businessId } = req.params;
  const deletedBusiness = await businessModel.findByIdAndDelete(businessId);
  if (!deletedBusiness) {
    return res.status(404).json("business not found");
  }
  return res.setStatus(200);
}

module.exports = {
  getBusiness,
  getAllBusiness,
  addBusiness,
  updateBusiness,
  deleteBusiness
}