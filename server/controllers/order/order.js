const Order = require('../../models/order.js');
const User = require('../../models/user.js');
const Coupon = require('../../models/coupon.js');
const asyncHandler = require('express-async-handler');

const createOrder = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.user;
        const { coupon, total, status, address } = req.body;
        const includedFields = 'title price';

        const userCart = await User.findById(_id).select('carts').populate('carts.product', includedFields);
        const products = userCart?.carts.map((element) => ({
            product: element.product._id,
            count: element.quantity,
            color: element.color
        }));

        let sumProduct = userCart?.carts?.reduce((sum, element) => sum + (+element.product?.price * +element.quantity), 0);
        const createData = { products, sumProduct, orderBy: _id, total, status };
        if (coupon) {
            const selectedCoupon = await Coupon.findById(coupon)
            sumProduct = Math.round(sumProduct * (1 - +selectedCoupon?.discount / 100) / 1000) * 1000;
            createData.coupon = coupon;
            createData.sumProduct = sumProduct;
        } else {
            sumProduct = sumProduct;
        }
        const response = await Order.create(createData).then(() => User.findByIdAndUpdate(_id, { addresses: address, carts: [] }));
        return res.status(200).json({
            message: 'Order created successfully',
            response: response,
            total: sumProduct
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Cannot create order'
        });
    }
});

const updateStatusOrder = asyncHandler(async (req, res) => {
    try {

        const { _id } = req.params;
        const { status } = req.body;
        const orderStatuses = ['pending', 'cancelled', 'success'];
        if (!status || !orderStatuses.includes(status)) {
            return res.status(400).json({
                message: 'Please provide a valid status: "cancelled", "pending", or "success"'
            });
        }
        const response = await Order.findByIdAndUpdate(_id, { status }, { new: true });
        return res.status(200).json({
            message: 'Order updated successfully',
            response: response
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Cannot create order'
        });
    }
});

// const getOrdersOfCurrentUser = asyncHandler(async (req, res) => {
//     try {
//         const { _id } = req.user;
//         const orders = await Order.find({ orderBy: _id });
//         return res.status(200).json({
//             message: 'Successfully',
//             orders: orders
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: 'Cannot get order'
//         });
//     }
// });

const getOrdersOfCurrentUser = asyncHandler(async (req, res) => {
    try {
        const queries = { ...req.query };
        const { _id } = req.user;
        console.log('_id', _id)
        console.log('queries', queries)
        const excludesFields = ['limit', 'sort', 'page', 'fields'];

        // Xóa các trường đặc biệt ra khỏi queries
        for (const field in queries) {
            if (excludesFields.includes(field)) {
                delete queries[field];
            }
        }
        // Format queries
        let queryString = JSON.stringify(queries);
        queryString = queryString.replace(/\b(gt|lt|gte|lte)\b/g, (matchedElement) => `$${matchedElement}`);
        let formatedStringQuery = JSON.parse(queryString);
        let colorQueryObject = {};
        let queryObject = {}
        let queryCommand = Order.find(formatedStringQuery);

        // search
        if (queries?.title) {
            formatedStringQuery.title = { $regex: queries.title, $options: 'i' }; //'i': không phân biệt chữ hoa chữ thường
        }
        if (queries?.category) {
            formatedStringQuery.category = { $regex: queries.category, $options: 'i' }; //'i': không phân biệt chữ hoa chữ thường
        }
        // if (queries?.color) {
        //     delete formatedStringQuery.color;
        //     const colorArray = queries.color?.split(',');
        //     const colorQuery = colorArray.map(element => ({ color: { $regex: element, $options: 'i' } }));
        //     colorQueryObject = { $or: colorQuery }
        // }
        // if (req.query.q) {
        //     delete formatedStringQuery.q;
        //     formatedStringQuery['$or'] = [
        //         { title: { $regex: req.query.q, $options: 'i' } },
        //         { category: { $regex: req.query.q, $options: 'i' } },
        //         { color: { $regex: req.query.q, $options: 'i' } }
        //     ]
        // }

        //Fields limittings
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queryCommand = queryCommand.select(fields);
        }

        //Pagniation
        const page = +req.query.page * 1 || 1;
        const limit = +req.query.limit * 1;
        const skip = (page - 1) * limit;

        // Find and Count documents
        const q = { ...formatedStringQuery, orderBy: _id }
        console.log('q', q)
        let orders = await Order.find(q).populate({ path: 'products.product' }).skip(skip).limit(limit);
        console.log(orders)
        let quantity = await Order.countDocuments(q);

        //Sort
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');//Nếu trong query string có tham số sort, phân tách các trường sắp xếp bằng dấu phẩy và thay thế bằng dấu cách
            products = products.sort((a, b) => {
                if (sortBy === 'price') {
                    return a.price - b.price;
                }
                if (sortBy === '-price') {
                    return b.price - a.price;
                }
                if (sortBy === 'createdAt') {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                }
                if (sortBy === '-createdAt') {
                    return new Date(a.createdAt) - new Date(b.createdAt);
                }
                if (sortBy === '-sold') {
                    return b.sold - a.sold;
                }
                if (sortBy === 'title') {
                    return a.title.localeCompare(b.title); // Sắp xếp theo tên từ A-Z
                }
                if (sortBy === '-title') {
                    return b.title.localeCompare(a.title); // Sắp xếp theo tên từ Z-A
                }

                return 0;
            })
        }

        return res.status(200).json({
            message: 'Get all orders successfully',
            data: {
                orders,
                quantity,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error getting orders',
            error: error.message,
        });
    }
});

module.exports = {
    createOrder,
    updateStatusOrder,
    // getOrdersOfCurrentUser,
    getOrdersOfCurrentUser
}