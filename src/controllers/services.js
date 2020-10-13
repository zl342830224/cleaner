const serviceModel = require('../models/services');
async function getAllService(req, res) {
  const service = await serviceModel.find();
  return res.json(service);
}
async function getService(req, res) {
  const { id: serviceId } = req.params;
  const service = await serviceModel.findById(serviceId);
  if (!service) {
    return res.status(404).json("service not found");
  }
  return res.json(service);
}
async function addService(req, res) {
  const { serviceId, serviceName, serviceType, servicePrice } = req.body;
  const service = new serviceModel({ serviceId, serviceName, serviceType, servicePrice });
  await service.save();
  return res.status(201).json(service);
}
async function updateService(req, res) {
  const { id: serviceId } = req.params;
  const { serviceName, serviceType, servicePrice } = req.body;
  const newService = serviceModel.findByIdAndUpdate(
    serviceId, 
    { serviceName, serviceType, servicePrice },
    { new: true }
    );
  if (!newService) {
    return res.status(404).json("service not found");
  }
  return res.json(newService);
}
async function deleteService(req, res) {
  const { id: serviceId } = req.params;
  const deletedService = serviceModel.findByIdAndDelete(serviceId);
  if (!deletedService) {
    return res.status(404).json("service not found");
  }
  return res.setStatus(200);
}
module.exports = {
  getAllService,
  getService,
  addService,
  updateService,
  deleteService
}