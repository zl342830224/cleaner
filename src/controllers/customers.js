//要使用model和数据库链接进行操作，得先引入model
const customerModel = require('../models/customer');

async function addCustomer(req, res) { 
  const { customerId, nickName, email, mobilePhone, address } = req.body;
  const customer = new customerModel({ customerId, nickName, email, mobilePhone, address });
  await customer.save();
  return res.status(201).json(customer);
};
//处理error 第1种方式(在使用async 和 await之后的处理方式)
// try {
//   await customer.save()
// } catch (e) {
//   return res.status(400).json(e.message)
// }
// return res.json(customer);

//处理error 第2种方式(在未使用async 和 await之前的处理方式)
// customer.save((err, result) => {
//   if (err) res.status(400).json(err);
//   return res.json(customer);
// })

async function getCustomer(req, res) { 
  const { id: customerId } = req.params;
  const customer = await customerModel.findById(customerId).populate("orders");//这里的.populated是将orders相关参数一起返回，如果想筛选显示哪些参数，可以加第二个参数
  if (!customer) {
    return res.status(404).json("customer not found")
  }
  return res.json(customer);
};

async function getAllCustomer(req, res) { 
  const customers = await customerModel.find();
  return res.json(customers);
};
//做更新时，不会对model中定义的required不会检测，因为只有在.save()的时候，才会触发model定义字段时的validation
async function updateCustomer(req, res) { 
  const { id: customerId } = req.params;//因为接口路径上的参数是ID，所以是取id后重命名为customerId
  const { nickName, email, mobilePhone, address } = req.body;
  const newCustomer = await customerModel.findByIdAndUpdate(
    customerId, 
    { nickName, email, mobilePhone, address }, 
    //这里加入runValidators: true，代表做更新时会触发validation
    {new: true, runValidators: true});//加了第三个参数new之后，返回的结果才是更新之后数据，不然返回的是更新之前的数据
  if(!newCustomer) {
    return res.status(404).json("customer not found");
  }
  return res.json(newCustomer);
};
 
async function deleteCustomer(req, res) { 
  const { id: customerId } = req.params;
  const deletedCustomer = await customerModel.findByIdAndDelete(customerId);
  if (!deletedCustomer) {
    return res.status(404).json("customer not found");
  }
  return res.sendStatus(200);
};

module.exports = {
  addCustomer,
  getCustomer,
  getAllCustomer,
  updateCustomer,
  deleteCustomer
}
