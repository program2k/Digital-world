const Product = require('../../models/product.js');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const product = require('../../models/product.js');
const makeSKU = require('uniqid');

const createProduct = asyncHandler(async (req, res) => {
    try {
        const { title, price, description, brand, category, color } = req.body;
        const images = req.files?.images?.map(element => element.path);
        if (!title && !price && !description && !brand && !category && !color) {
            return res.status(400).json({
                message: 'Please fill in all fields'
            });
        }
        if (req.body && req.body.title) {
            req.body.slug = slugify(req.body.title, {
                lower: true
            });
        }
        if (images) {
            req.body.images = images;
        }
        const product = await Product.create(req.body);
        return res.status(201).json({
            message: 'Create Product successfully',
            data: product
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            messagage: 'Error creating product',
            error: error.message
        });
    }
});

const getAllProducts = asyncHandler(async (req, res) => {
    try {
        const queries = { ...req.query };
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
        let queryCommand = Product.find(formatedStringQuery);

        // search
        if (queries?.title) {
            formatedStringQuery.title = { $regex: queries.title, $options: 'i' }; //'i': không phân biệt chữ hoa chữ thường
        }
        if (queries?.category) {
            formatedStringQuery.category = { $regex: queries.category, $options: 'i' }; //'i': không phân biệt chữ hoa chữ thường
        }
        if (queries?.color) {
            delete formatedStringQuery.color;
            const colorArray = queries.color?.split(',');
            const colorQuery = colorArray.map(element => ({ color: { $regex: element, $options: 'i' } }));
            colorQueryObject = { $or: colorQuery }
        }
        if(req.query.q) {
            delete formatedStringQuery.q;
            formatedStringQuery['$or'] = [
                { title: { $regex: req.query.q, $options: 'i' } },
                { category: { $regex: req.query.q, $options: 'i' } },
                { color: { $regex: req.query.q, $options: 'i' } }
            ]
        }

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
        const q = { ...colorQueryObject, ...formatedStringQuery }
        let products = await Product.find(q).populate('category').skip(skip).limit(limit);
        // console.log(products)
        let quantity = await Product.countDocuments(q);

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
            message: 'Get all products successfully',
            data: {
                products,
                quantity,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error getting products',
            error: error.message,
        });
    }
});


const getProductById = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        const product = await Product.findById(_id).populate({
            path: 'ratings',
            populate: {
                path: 'postedBy',
                select: 'firstName lastName avatar',
            }
        });
        if (!product) {
            return res.status(404).json({
                messagage: 'Product not found'
            })
        }
        return res.status(200).json({
            message: 'Get product successfully',
            data: product
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error getting product',
            error: error.message
        });
    }
})

const updateProductById = asyncHandler(async (req, res) => {
    try {
        if (Object.entries(req.body).length === 0) {
            return res.status(400).json({
                message: 'Please fill in all fields'
            });
        }
        const { _id } = req.params;
        const product = await Product.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true
        });
        return res.status(200).json({
            message: 'Update product successfully',
            data: product
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            messagage: 'Error updating product',
            error: error.message
        });
    }
});

const deleteProductById = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        await Product.findByIdAndDelete(_id);
        return res.status(200).json({
            messagage: 'Delete product successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            messagage: 'Error deleting product',
            error: error.message
        });
    }
})

const handleRatings = asyncHandler(async (req, res) => {
    try {
        const { _id: _id } = req.user;
        const { star, comment, _id: p_id, updatedAt } = req.body;
        if (!star || !p_id) {
            return res.status(404).json({
                messagage: 'Missing input'
            });
        };
        const product = await Product.findById(p_id);
        const isRated = product?.ratings?.find((element) => element.postedBy?.toString() === _id);
        if (isRated) {
            //cap nhap so sao va binh luan:
            await Product.updateOne({
                ratings: { $elemMatch: isRated },
            }, {
                $set: { "ratings.$.star": star, "ratings.$.comment": comment, "ratings.$.updatedAt": updatedAt }
            }, { new: true });
        } else {
            await Product.findByIdAndUpdate(p_id, {
                $push: {
                    ratings: { star, comment, postedBy: _id, updatedAt }
                }
            }, { new: true });
        }
        const updatedProduct = await Product.findById(p_id);
        const count = updatedProduct.ratings.length;
        const sumRated = updatedProduct.ratings.reduce((sum, element) => sum + +element.star, 0);
        updatedProduct.totalRatings = Math.round(sumRated * 10 / count) / 10;
        await updatedProduct.save();

        return res.status(200).json({
            messagage: "success",
            updatedProduct: updatedProduct
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            messagage: 'Error handling ratings request',
            error: error.messagage
        });
    }
});

const uploadImage = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        if (!req.files) {
            return res.status(400).json({
                messagage: 'Please select files first'
            });
        }
        await Product.findByIdAndUpdate(_id, {
            $push: { images: { $each: req.files.map((element) => element.path) } }
        }, { new: true });
        return res.status(200).json({
            messagage: 'Uploading image oke'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            messagage: 'Error uploading image',
            error: error.messagage
        });
    }
});

const addVariant = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const { title, price, color } = req.body;
    const images = req.files?.images?.map(element => element.path);
    if (!title || !price || !color) {
        return res.status(400).json({
            message: 'Please fill in all fields'
        });
    }
    const product = await Product.findByIdAndUpdate(_id, {
        $push: {
            variants: { title, price, color, images, sku: makeSKU().toUpperCase() }
        }
    }, { new: true });
    return res.status(200).json({
        message: 'Add variant oke',
        data: product
    });
});

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    handleRatings,
    uploadImage,
    addVariant
}