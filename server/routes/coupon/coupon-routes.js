const router = require('express').Router();
const { verifyAccessToken } = require('../../middlewares/verifyToken.js');
const couponController = require('../../controllers/coupon/coupon-controller.js');

router.post('/create', verifyAccessToken, couponController.createCoupon);
router.get('/coupons', verifyAccessToken, couponController.getCoupons);
router.get('/coupon/:_id', verifyAccessToken, couponController.getCouponById);
router.put('/update/:_id', verifyAccessToken, couponController.updateCouponById);
router.delete('/delete/:_id', verifyAccessToken, couponController.deleteCouponById);

module.exports = router;