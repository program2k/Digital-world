const Brand = require('../../models/brand.js');
const asyncHandler = require('express-async-handler');

const createBrand = asyncHandler(async (req, res) => {
    try {
        const response = await Brand.create(req.body);
        return res.status(201).json({
            message: 'Brand created successfully',
            Brand: response
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error creating brand',
            error: error
        })
    }
});

const getBrands = asyncHandler(async (req, res) => {
    try {
        const response = await Brand.find();
        if (response.length <= 0) {
            return res.status(200).json({
                message: 'Brand is empty',
            });
        }
        return res.status(200).json({
            message: 'Success',
            data: response
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error while getting brands',
            error: error
        })
    }
});

const getBrandById = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        const brand = await Brand.findById(_id);
        if (!category) {
            return res.status(404).json({
                message: `Brand with Id: ${_id} not found`
            });
        };
        return res.status(200).json({
            message: 'Success',
            Brand: brand
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error while getting Brand',
            error: error
        })
    }
});

const updateBrandById = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        if (Object.entries(req.body).length === 0) {
            return res.status(404).json({
                message: 'Please provide all required fields'
            });
        }
        const brand = await Brand.findByIdAndUpdate(_id, req.body, { new: true });
        return res.status(200).json({
            message: 'Success',
            UpdatedBrand: brand
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error while updating Brand',
            error: error
        })
    }
});

const deleteBrandById = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        await Brand.findByIdAndDelete(_id);
        return res.status(200).json({
            message: 'Success'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error while deleting Brand',
            error: error
        })
    }
});

module.exports = {
    createBrand,
    getBrands,
    getBrandById,
    updateBrandById,
    deleteBrandById
}