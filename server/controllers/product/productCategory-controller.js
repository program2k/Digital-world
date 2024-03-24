const productCategory = require('../../models/product-category.js');
const ProductCategory = require('../../models/product-category.js');
const asyncHandler = require('express-async-handler');

const createProductCategory = asyncHandler(async (req, res) => {
    try {
        const response = await ProductCategory.create(req.body);
        return res.status(201).json({
            message: 'Product category created successfully',
            ProductCategory: response
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error creating product category',
            error: error
        })
    }
});

const getProductCategories = asyncHandler(async (req, res) => {
    try {
        const queries = { ...req.query };
        const excludesFields = ['limit', 'sort', 'page', 'fields'];

        for (const field in queries) {
            if (excludesFields.includes(field)) {
                delete queries[field];
            }
        }

        let queryString = JSON.stringify(queries);
        queryString = queryString.replace(/\b(gt|lt|gte|lte)\b/g, (matchedElement) => `$${matchedElement}`);
        const formatedStringQuery = JSON.parse(queryString);

        if (queries?.title) {
            formatedStringQuery.title = { $regex: queries.title, $options: 'i' }; //'i': không phân biệt chữ hoa chữ thường
        }

        const response = await productCategory.find(formatedStringQuery).populate('brands products');
        if (response.length <= 0) {
            return res.status(200).json({
                message: 'Product Category is empty',
            });
        }
        return res.status(200).json({
            message: 'Success',
            ProductCategories: response
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error while getting productCategories',
            error: error
        })
    }
});

const getProductCategoryById = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        const category = await ProductCategory.findById(_id).populate('products');
        if (!category) {
            return res.status(404).json({
                message: `Product category with Id: ${_id} not found`
            });
        };
        return res.status(200).json({
            message: 'Success',
            ProductCategory: category
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error while getting productCategory',
            error: error
        })
    }
});

const updateProductCategoryById = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        if (Object.entries(req.body).length === 0) {
            return res.status(404).json({
                message: 'Please provide all required fields'
            });
        }
        const category = await ProductCategory.findByIdAndUpdate(_id, req.body, { new: true });
        return res.status(200).json({
            message: 'Success',
            UpdatedProductCategory: category
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error while updating productCategory',
            error: error
        })
    }
});

const deleteProductCategoryById = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        await ProductCategory.findByIdAndDelete(_id);
        return res.status(200).json({
            message: 'Success'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error while deleting productCategory',
            error: error
        })
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
        const response = await ProductCategory.findByIdAndUpdate(_id, {
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

module.exports = {
    createProductCategory,
    getProductCategories,
    getProductCategoryById,
    updateProductCategoryById,
    deleteProductCategoryById,
    uploadImage
}