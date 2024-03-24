const orderController = require('../../controllers/order/order.js');
const router = require('express').Router();
const { verifyAccessToken } = require('../../middlewares/verifyToken.js');

router.post('/create', verifyAccessToken, orderController.createOrder);
router.put('/updateStatus/:_id', verifyAccessToken, orderController.updateStatusOrder);
// router.get('/userOrders/:_id', verifyAccessToken, orderController.getOrdersOfCurrentUser);
router.get('/orders', verifyAccessToken, orderController.getOrdersOfCurrentUser);

module.exports = router;