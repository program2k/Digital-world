const blogController = require('../../controllers/blog/blog-controller.js');
const { verifyAccessToken } = require('../../middlewares/verifyToken.js');
const uploader = require('../../config/cloundinary-config.js');
const router = require('express').Router();

router.post('/create', verifyAccessToken, blogController.createBlog);
router.put('/update/:_id', verifyAccessToken, blogController.updateBlogById);
router.get('/blogs', verifyAccessToken, blogController.getAllBlogs);
router.get('/blog/:_id', verifyAccessToken, blogController.getBlogById);
router.delete('/delete/:_id', verifyAccessToken, blogController.deleteBlogById);
router.put('/like/:_id', verifyAccessToken, blogController.like);
router.put('/dislike/:_id', verifyAccessToken, blogController.dislike);
router.put('/uploadImage/:_id', verifyAccessToken, uploader.single('Image'),blogController.uploadImage);

module.exports = router;