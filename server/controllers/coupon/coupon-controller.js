const Coupon = require('../../models/coupon.js');
const asyncHandler = require('express-async-handler');

const createCoupon = asyncHandler(async (req, res) => {
    try {
        const { name, discount, expiredDate } = req.body;
        if(!name || !discount || !expiredDate){
            return res.status(400).json({
                message: 'Please enter a title, discount and expiration date'
            });
        }
        const coupon = await Coupon.create(req.body);
        return res.status(200).json({
            message: 'Coupon created successfully',
            newCoupon: coupon
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Cannot create a coupon'
        })
    }
})

const getCoupons = asyncHandler(async (req, res) => {
    try {
        const coupons = await Coupon.find();
        if(coupons.length <= 0){
            return res.status(200).json({
                message: 'A list of coupon is empty'
            });
        }
        return res.status(200).json({
            message: 'Successfully',
            ListOfCoupons: coupons
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Cannot get a list of coupon'
        });
    }
});

const getCouponById = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        const coupon = await Coupon.findById(_id);
        if(!coupon){
            return res.status(404).json({
                message: `Cannot find coupon with id: ${_id}`
            });
        }
        return res.status(200).json({
            message: 'Successfully',
            coupon: coupon
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Cannot get a list of coupon'
        });
    }
});

const updateCouponById = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        if(Object.entries(req.body).length === 0){
            return res.status(404).json({
                message: 'Please provide all required fields'
            });
        }
        if(req.body.expiredDate){
            req.body.expiredDate = Date.now() + +req.body.expiredDate * 24 * 60 *60 * 1000;
        }
        const updatedCoupon = await Coupon.findByIdAndUpdate(_id, req.body, { new: true});
        return res.status(201).json({
            message: 'Successfully',
            UpdatedCoupon: updatedCoupon
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Cannot get a list of coupon'
        });
    }
});

const deleteCouponById = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        await Coupon.findByIdAndDelete(_id);
        return res.status(200).json({
            message: 'Success'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error while deleting Cpoupon',
            error: error
        })
    }
});

module.exports = {
    createCoupon,
    getCoupons,
    getCouponById,
    updateCouponById,
    deleteCouponById
}

