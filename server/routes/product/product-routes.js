const productController = require('../../controllers/product/product-controller.js');
const router = require('express').Router();
const { verifyAccessToken } = require('../../middlewares/verifyToken.js');
// const { verifyOauth2AccessToken} = require('../../middlewares/verifyOauth2Token.js');
const uploader = require('../../config/cloundinary-config.js');

router.post('/createProduct', verifyAccessToken, uploader.fields([{ name: 'images', maxCount: 10 }]), productController.createProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:_id', productController.getProductById);
router.put('/updateProduct/:_id', verifyAccessToken, productController.updateProductById);
router.delete('/deleteProduct/:_id', verifyAccessToken, productController.deleteProductById);
router.put('/rating', verifyAccessToken, productController.handleRatings);
router.put('/uploadImage/:_id', verifyAccessToken, uploader.array('images', 10), productController.uploadImage);
router.put('/variant/:_id', verifyAccessToken, uploader.fields([{ name: 'images', maxCount: 10 }]), productController.addVariant);

module.exports = router;