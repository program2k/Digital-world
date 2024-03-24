const router = require('express').Router();
const { verifyAccessToken } = require('../../middlewares/verifyToken.js');
const blogCategoryController = require('../../controllers/blog/blogCategory-controller.js');

router.post('/create', verifyAccessToken, blogCategoryController.createBlogCategory);
router.get('/blogCategories', verifyAccessToken, blogCategoryController.getBlogCategories);
router.get('/blogCategory/:_id', verifyAccessToken, blogCategoryController.getBlogCategoryById);
router.put('/update/:_id', verifyAccessToken, blogCategoryController.updateBlogCategoryById);
router.delete('/delete/:_id', verifyAccessToken, blogCategoryController.deleteBlogCategoryById);

module.exports = router;