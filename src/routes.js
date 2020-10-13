const express = require('express');

const customerRoutes = require('./routes/customers');//引入routes文件夹下各个路由
const businessRoutes = require('./routes/business');
const orderRoutes = require('./routes/orders');
const serviceRoutes = require('./routes/services');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

const authGuard = require('./middleware/authGuard');

const router = express.Router();

router.use("/customer", authGuard, customerRoutes);//对子路径进行绑定，绑定后路径成为:api/customer/
router.use("/business", businessRoutes);
router.use("/order", orderRoutes);
router.use("/service", serviceRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);

module.exports = router;