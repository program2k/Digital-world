const router = require('express').Router();
const { verifyAccessToken } = require('../../middlewares/verifyToken.js');
const brandController = require('../../controllers/brand/brand-controller.js');

router.post('/create', verifyAccessToken, brandController.createBrand);
router.get('/brands', verifyAccessToken, brandController.getBrands);
router.get('/brand/:_id', verifyAccessToken, brandController.getBrandById);
router.put('/update/:_id', verifyAccessToken, brandController.updateBrandById);
router.delete('/delete/:_id', verifyAccessToken, brandController.deleteBrandById);

module.exports = router;