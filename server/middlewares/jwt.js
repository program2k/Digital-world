const jwt = require('jsonwebtoken');

const generateAccessToken = (userId, userRole) => {
    return jwt.sign(
        { _id: userId, userRole },
        process.env.SECRET_KEY,
        { expiresIn: '3d' },
    )
}

const generateRefreshToken = (userId) => {
    return jwt.sign(
        { _id: userId },
        process.env.SECRET_KEY,
        { expiresIn: '7d' },
    )
};

module.exports = {
    generateAccessToken,
    generateRefreshToken
}