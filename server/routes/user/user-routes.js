const userController = require('../../controllers/user/user-controller');
const router = require('express').Router();
const { verifyAccessToken } = require('../../middlewares/verifyToken.js');
const uploader = require('../../config/cloundinary-config.js');
const passport = require('passport');
require('dotenv').config();
const UserController = require('../../controllers/user/user-controller');

//Authentication
router.post('/register', userController.register);
router.put('/register/finalRegister/:token', userController.finalRegister);
router.post('/login', userController.login);
router.post('/refreshToken', userController.newAccessToken);
router.post('/logout', userController.logout);
router.post('/forgotPassword', userController.forgotPassword);
router.put('/resetPassword', userController.resetPassword);

//Oauth2
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

router.get('/auth/google/callback', (req, res, next) => {
    passport.authenticate('google', (err, profile) => {
        req.user = profile
        next()
    })(req, res, next)
}, (req, res) => {
    res.redirect(`${process.env.URL_CLIENT}/login-success/${req.user?.id}/${req.user.tokenLogin}`)
});

router.get('/auth/facebook',
    passport.authenticate('facebook', { session: false, scope: ['email', 'profile'] }));

router.get('/auth/facebook/callback', (req, res, next) => {
    passport.authenticate('facebook', (err, profile) => {
        req.user = profile
        next()
    })(req, res, next)
}, (req, res) => {
    res.redirect(`${process.env.URL_CLIENT}/login-success/${req.user?.id}/${req.user.tokenLogin}`)
});

router.post('/auth/login-success', UserController.oauth2LoginSuccessController);

//CRUD:
// router.post('/register', userController.register);
router.get('/get-one/:oauth2Id', userController.getOauth2User);
router.get('/user',verifyAccessToken, userController.getUSer);
router.get('/users',verifyAccessToken, userController.getAllUsers);
router.put('/update/:_id',verifyAccessToken, userController.updateUserById);
router.put('/updateCurrentUser', verifyAccessToken, uploader.single('avatar'), userController.updateCurrentUser);
router.delete('/delete/:_id',verifyAccessToken, userController.deleteUserById);
router.put('/updateAddress/',verifyAccessToken, userController.updateUserAddress);
router.put('/updateCart', verifyAccessToken, userController.updateUserCart);
router.delete('/removeCart/:_id/:color', verifyAccessToken, userController.removeUserCart);

module.exports = router;

