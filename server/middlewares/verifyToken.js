const jwt = require('jsonwebtoken');
const jwt_simple = require('jwt-simple');
const asyncHandler = require('express-async-handler');

const verifyAccessToken = asyncHandler(async (req, res, next) => {
    // console.log('da chay nfjdnfjdf')
    // console.log('req.headers', req?.headers)
    if (req?.headers?.authorization) {
        if (req?.headers?.authorization?.startsWith('Bearer ')) {
            const token = req?.headers?.authorization.split(' ')[1];
            jwt.verify(token, process.env.SECRET_KEY, (error, decode) => {
                if (error) {
                    return res.status(401).json({ message: 'Invalid accessToken' });
                }
                req.user = decode;
                // console.log('req.currentUser', req.user)
                next();
            })
        }
    } else {
        return res.status(401).json({ message: 'Require Authentication!!!' });
    }
});


const isAdmin = asyncHandler(async (req, res, next) => {
    const { role } = req.user;
    if (role === 'user' || role === 'manager') {
        return res.status(401).json({
            success: false,
            message: 'Required admin credentials'
        });
    }
    next();
});

module.exports = { verifyAccessToken, isAdmin };