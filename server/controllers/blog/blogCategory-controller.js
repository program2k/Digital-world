const BlogCategory = require('../../models/blog-category.js');
const asyncHandler = require('express-async-handler');

const createBlogCategory = asyncHandler(async (req, res) => {
    try {
        const response = await BlogCategory.create(req.body);
        return res.status(201).json({
            message: 'Blog category created successfully',
            BlogCategory: response
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error creating blog category',
            error: error
        })
    }
});

const getBlogCategories = asyncHandler(async (req, res) => {
    try {
        const response = await BlogCategory.find();
        if (response.length <= 0) {
            return res.status(200).json({
                message: 'Blog Category is empty',
            });
        }
        return res.status(200).json({
            message: 'Success',
            ProductCategories: response
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error while getting blogCategories',
            error: error
        })
    }
});

const getBlogCategoryById = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        const category = await BlogCategory.findById(_id);
        if (!category) {
            return res.status(404).json({
                message: `Blog category with Id: ${_id} not found`
            });
        };
        return res.status(200).json({
            message: 'Success',
            BlogCategory: category
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error while getting BlogCategory',
            error: error
        })
    }
});

const updateBlogCategoryById = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        if (Object.entries(req.body).length === 0) {
            return res.status(404).json({
                message: 'Please provide all required fields'
            });
        }
        const category = await BlogCategory.findByIdAndUpdate(_id, req.body, { new: true });
        return res.status(200).json({
            message: 'Success',
            UpdatedBlogCategory: category
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error while updating BlogCategory',
            error: error
        })
    }
});

const deleteBlogCategoryById = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        await BlogCategory.findByIdAndDelete(_id);
        return res.status(200).json({
            message: 'Success'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error while deleting BlogCategory',
            error: error
        })
    }
});

module.exports = {
    createBlogCategory,
    getBlogCategories,
    getBlogCategoryById,
    updateBlogCategoryById,
    deleteBlogCategoryById
}