const Blog = require('../../models/blog.js');
const asyncHandler = require('express-async-handler');
const product = require('../../models/product.js');

const createBlog = asyncHandler(async (req, res) => {
    try {
        const { title, description, category } = req.body;
        if (!title || !description || !category) {
            return res.status(400).json({
                message: 'Please enter a title, description, and category'
            });
        }
        const blog = await Blog.create(req.body);
        return res.status(200).json({
            message: 'Created successfully',
            CreatedBlog: blog
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error creating blog',
            error: error
        })
    }
});

const getAllBlogs = asyncHandler(async (req, res) => {
    try {
        const blogs = await Blog.find();
        if (blogs.length <= 0) {
            return res.status(200).json({
                message: 'Data is empty'
            });
        }
        return res.status(200).json({
            message: 'Success',
            Data: blogs
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Cannot get all blogs',
        })
    }
});

const getBlogById = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        const excludesFields = '-refreshToken -password -role -createdAt -updatedAt';
        const blog = await Blog.findByIdAndUpdate(_id, {
            $inc: { numberViews: 1 }
        }, { new: true }).populate('likes', excludesFields).populate('dislikes', excludesFields);
        return res.status(200).json({
            message: 'Success',
            Data: blog
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Cannot get blog by id',
        });
    }
})

const updateBlogById = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        if (!Object.entries(req.body).length === 0) {
            return res.status(400).json({
                message: 'Please fill all fields what you want to update!'
            })
        };
        const updatedBlog = await Blog.findByIdAndUpdate(_id, req.body, { new: true });
        return res.status(200).json({
            message: 'Updated blog successfully',
            updatedBlog: updatedBlog
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error updating blog',
            error: error
        })
    }
});

const deleteBlogById = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        await Blog.findByIdAndDelete(_id);
        return res.status(200).json({
            message: 'Blog deleted successfully'
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error deleting blog',
            error: error
        })
    }
})

const like = asyncHandler(async (req, res) => {
    try {
        console.log('like')
        const { _id: u_id } = req.user;
        const { _id: b_id } = req.params;
        if (!u_id || !b_id) {
            return res.status(400).json({
                message: 'Missing or invalid input'
            });
        }
        const blog = await Blog.findById(b_id);
        if (!blog) {
            return res.status(400).json({
                message: `Cannot find blog with id ${b_id}`
            });
        };
        const alreadyDisliked = blog?.dislikes?.find((dislikeElement) => dislikeElement.toString() === u_id);
        if (alreadyDisliked) {
            const response = await Blog.findByIdAndUpdate(b_id, {
                $pull: { dislikes: u_id },
                isDisliked: false,
            }, { new: true })
            return res.status(200).json({
                message: 'Success',
                response: response
            });
        }
        const isLiked = blog?.likes?.find((likeElement) => likeElement.toString() === u_id);
        if (isLiked) {
            const response = await Blog.findByIdAndUpdate(b_id, {
                $pull: { likes: u_id },
                isLiked: false,
            }, { new: true });
            return res.status(200).json({
                message: 'Success',
                response: response
            });
        } else {
            const response = await Blog.findByIdAndUpdate(b_id, {
                $push: { likes: u_id },
                isLiked: true,
            }, { new: true });
            return res.status(200).json({
                message: 'Success',
                response: response
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error',
            error: error
        })
    }
});

const dislike = asyncHandler(async (req, res) => {
    try {
        const { _id: u_id } = req.user;
        const { _id: b_id } = req.params;
        if (!u_id || !b_id) {
            return res.status(400).json({
                message: 'Missing or invalid input'
            });
        }
        const blog = await Blog.findById(b_id);
        if (!blog) {
            return res.status(400).json({
                message: `Cannot find blog with id ${b_id}`
            });
        };
        const alreadyLiked = blog?.likes?.find((likeElement) => likeElement.toString() === u_id);
        if (alreadyLiked) {
            const response = await Blog.findByIdAndUpdate(b_id, {
                $pull: { dislikes: u_id },
                isDisliked: true,
            }, { new: true })
            return res.status(200).json({
                message: 'Success',
                response: response
            });
        }
        const isDiskiked = blog?.likes?.find((likeElement) => likeElement.toString() === u_id);
        if (isDiskiked) {
            const response = await Blog.findByIdAndUpdate(b_id, {
                $pull: { dislikes: u_id },
                isLiked: false,
            }, { new: true });
            return res.status(200).json({
                message: 'Success',
                response: response
            });
        } else {
            const response = await Blog.findByIdAndUpdate(b_id, {
                $push: { dislikes: u_id },
                isLiked: true,
            }, { new: true });
            return res.status(200).json({
                message: 'Success',
                response: response
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error',
            error: error
        })
    }
});

const uploadImage = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        if (!req.file) {
            return res.status(400).json({
                message: 'Please select a file'
            });
        }
        await Blog.findByIdAndUpdate(_id, {
            Image: req.file.path
        }, { new: true });
        return res.status(200).json({
            message: 'Upload image successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error',
            error: error
        })
    }
});

module.exports = {
    createBlog,
    updateBlogById,
    getAllBlogs,
    getBlogById,
    deleteBlogById,
    like,
    dislike,
    uploadImage
}