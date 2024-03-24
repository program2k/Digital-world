const User = require('../../models/user.js');
const asyncHandler = require('express-async-handler');
const { generateAccessToken, generateRefreshToken } = require('../../middlewares/jwt.js');
const { sendMail } = require('../../utils/sendmail.js')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const makeToken = require('uniqid');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// const register = asyncHandler(async (req, res) => {
//     const { firstName, lastName, email, password, mobile } = req.body;

//     if (!firstName || !lastName || !email || !password || !mobile) {
//         return res.status(400).json({
//             message: 'Please provide all fields',
//         });
//     }
//     const isRegister = await User.findOne({ email: email });
//     if (isRegister) {
//         return res.status(200).json({
//             message: 'User already exists',
//         });
//     }
//     const result = await User.create(req.body);
//     res.status(201).json({
//         message: 'User created successfully',
//         result
//     });
// });

const register = asyncHandler(async (req, res) => {
    try {
        const { email, password, firstName, lastName, mobile } = req.body;
        if (!email || !password || !firstName || !lastName || !mobile) {
            return res.status(400).json({
                message: 'Please provide all fields'
            });
        }
        const isRegister = await User.findOne({ email: email });
        if (isRegister) {
            return res.status(200).json({
                message: 'User already exists',
            });
        }
        const token = makeToken();
        const emailDecoded = btoa(email) + '@' + token;
        const newUser = await User.create({
            email: emailDecoded,
            password,
            firstName,
            lastName,
            mobile
        });
        if (newUser) {
            const html = `<h2>Register Code</h2><br/><blockquote>${token}</blockquote>`;
            sendMail({ email, html, subject: 'Hoàn tất đăng kí Digital World' })
        }
        setTimeout(async () => {
            await User.deleteOne({ email: emailDecoded })
        }, 200000);

        return res.json({
            success: newUser ? true : false,
            message: newUser ? 'Please check your email to activate your account' : 'Something went wrong, please try again',
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error
        });
    }
});

const finalRegister = asyncHandler(async (req, res) => {
    try {
        const { token } = req.params;

        const notActivedEmail = await User.findOne({
            email: new RegExp(`${token}`)
        });
        console.log(notActivedEmail);
        if (notActivedEmail) {

            notActivedEmail.email = atob(notActivedEmail?.email?.split('@')[0]);
            notActivedEmail.save();
        }
        return res.json({
            success: notActivedEmail ? true : false,
            message: notActivedEmail ? 'Register is successfully, Please login.' : 'Something went wrong, please try again',
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error
        });
    }
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Please provide all fields',
        });
    }
    const result = await User.findOne({ email: email });
    if ((result && await result.isCorrectEmail(email) && await result.isCorrectPassword(password))) {
        const accessToken = generateAccessToken(result._id, result.role);
        const refreshToken = generateRefreshToken(result._id);
        await User.findByIdAndUpdate(
            result._id,
            { refreshToken: refreshToken },
            { new: true }, // tra ve data sau khi update
        );
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 1000 });
        return res.status(200).json({
            message: 'User logged in successfully',
            accessToken,
            result
        });
    } else {
        return res.status(401).json({
            message: 'Invalid credentials',
        });
    }
});

const newAccessToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    console.log(cookie);
    if (!cookie.refreshToken || !cookie) {
        return res.status(401).json({
            message: 'Please login first',
        });
    }
    jwt.verify(cookie.refreshToken, process.env.SECRET_KEY, async (error, decode) => {
        if (error) {
            console.log(error);
            return res.status(401).json({
                message: 'No refresh token in the cookie',
            });
        }
        const result = await User.findOne({
            _id: decode._id,
            refreshToken: cookie.refreshToken
        })
        return res.status(200).json({
            message: 'Token refreshed successfully',
            newAccessToken: generateAccessToken(result._id, result.role)
        })
    })
});

const logout = async (req, res) => {
    const cookie = req.cookies;
    if (!cookie.refreshToken && !cookie) {
        return res.status(401).json({
            message: 'Please login first',
        });
    }
    jwt.verify(cookie.refreshToken, process.env.SECRET_KEY, async (error, decode) => {
        if (error) {
            return res.status(401).json({
                message: 'No refresh token in the cookie',
            });
        }
        const result = await User.findOne({
            _id: decode._id,
            refreshToken: cookie.refreshToken
        })
        await User.findByIdAndUpdate(
            result._id,
            { refreshToken: '' },
            { new: true }, // tra ve data sau khi update
        );
        res.clearCookie('refreshToken');
        return res.status(200).json({
            message: 'User logged out successfully',
        })
    })
};

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
        if (!email) {
            return res.status(400).json({
                message: 'Please provide email',
            });
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(200).json({
                success: false,
                message: 'User not found',
            });
        }
        const resetToken = await user.createChangePasswordToken();
        await user.save({ validateBeforeSave: false });
        const html = `Xin vui lòng click vào link dưới đây để đổi mật khẩu:
         <a href=${process.env.CLIENT_URL}/resetPassword/${resetToken}>Click Here</a>`;
        const data = {
            email,
            html,
            subject: 'Forgot Password',
        }
        const a = await sendMail(data);
        return res.status(200).json({
            success: a?.response?.includes('OK') ? true : false,
            message: a?.response?.includes('OK') ? 'Email sent successfully' : 'Error, Please try again'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    }
});

const resetPassword = asyncHandler(async (req, res) => {
    try {
        const { password, token } = req.body;
        if (!password || !token) {
            return res.status(400).json({
                message: 'Please provide all fields',
            });
        }
        const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await User.findOne({
            passwordResetToken: resetPasswordToken,
            // passwordTokenExpiredIn: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(400).json({
                message: 'Invalid reset oken',
            });
        }
        user.password = password;
        user.resetPasswordToken = undefined;
        user.passwordChangedAt = Date.now();
        user.passwordResetTokenExpiredIn = undefined;
        await user.save({ validateBeforeSave: false });

        return res.status(200).json({
            success: true,
            message: 'Password changed successfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    }
});

const oauth2LoginSuccessController = asyncHandler(async (req, res) => {
    try {
        const newTokenLogin = uuidv4();
        const { oauth2Id, tokenLogin } = req.body;
        if (!oauth2Id || !tokenLogin) {
            return res.status(400).json({
                message: 'Please provide all fields',
            });
        }
        let [response] = await Promise.all([
            User.findOne({ oauth2Id, tokenLogin }).lean().exec(),
            User.updateOne({ oauth2Id: oauth2Id }, { tokenLogin: newTokenLogin })
        ]);
        const token = response && jwt.sign({ _id: response._id, oauth2Id: response.oauth2Id, email: response.email, role: response.role }, process.env.SECRET_KEY, { expiresIn: '1d' });
        return res.status(200).json({
            message: 'Token created successfully',
            token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    }
});

const getOauth2User = asyncHandler(async (req, res) => {
    try {
        const { oauth2Id } = req.params;
        const response = await User.findOne({ oauth2Id: oauth2Id }).lean().exec();
        if (!response) {
            return res.status(200).json({
                message: 'User not found',
            });
        }
        return res.status(200).json({
            message: 'Success',
            data: response
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error
        });

    }
});

const getUSer = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.user;
        console.log('req.user', req.user)

        const result = await User.findById(_id).select('-password -refreshToken').populate({
            path: 'carts.product',
            select: 'title images price',
        });
        if (!result) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        return res.status(200).json({
            message: 'User fetched successfully',
            result
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    }
});

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const queries = { ...req.query };
        const excludesFields = ['limit', 'sort', 'page', 'fields'];

        // Xóa các trường đặc biệt ra khỏi queries
        for (const field in queries) {
            if (excludesFields.includes(field)) {
                delete queries[field];
            }
        }
        // Format queries
        let queryString = JSON.stringify(queries);
        queryString = queryString.replace(/\b(gt|lt|gte|lte)\b/g, (matchedElement) => `$${matchedElement}`);
        let formatedStringQuery = JSON.parse(queryString);
        let queryCommand = User.find(formatedStringQuery);

        // search
        if (req.query.q) {
            delete formatedStringQuery.q;
            formatedStringQuery['$or'] = [
                { firstName: { $regex: req.query.q, $options: 'i' } },
                { lastName: { $regex: req.query.q, $options: 'i' } },
                { email: { $regex: req.query.q, $options: 'i' } }
            ]
        }

        //Fields limittings
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queryCommand = queryCommand.select(fields);
        }

        //Pagniation
        const page = +req.query.page * 1 || 1;
        const limit = +req.query.limit * 1;
        const skip = (page - 1) * limit;

        // Find and Count documents
        let users = await User.find(formatedStringQuery).skip(skip).limit(limit);
        // console.log(products)
        let quantity = await User.countDocuments(formatedStringQuery);

        //Sort
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');//Nếu trong query string có tham số sort, phân tách các trường sắp xếp bằng dấu phẩy và thay thế bằng dấu cách
            users = users.sort((a, b) => {
                if (sortBy === 'createdAt') {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                }
                if (sortBy === '-createdAt') {
                    return new Date(a.createdAt) - new Date(b.createdAt);
                }
                if (sortBy === 'firstName') {
                    return a.firstName.localeCompare(b.firstName); // Sắp xếp theo tên từ A-Z
                }
                if (sortBy === '-firstName') {
                    return b.firstName.localeCompare(a.firstName); // Sắp xếp theo tên từ Z-A
                }

                return 0;
            })
        }

        return res.status(200).json({
            message: 'Get all users successfully',
            data: {
                users,
                quantity,
            },
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    }
});

const getUserById = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        return res.status(200).json({
            message: 'User fetched successfully',
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    }
});

const updateUserById = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        if (Object.entries(req.body).length === 0) {
            return res.status(400).json({
                message: 'Please provide all fields',
            });
        }
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        return res.status(200).json({
            message: 'User updated successfully',
            user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    }
});

const updateCurrentUser = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.user;
        const { firstName, lastName, email, mobile } = req.body;
        const data = { firstName, lastName, email, mobile };
        if (req.file) {
            data.avatar = req.file.path
        }
        if (Object.entries(req.body).length === 0) {
            return res.status(400).json({
                message: 'Please provide all fields',
            });
        }
        const user = await User.findByIdAndUpdate(_id, data, { new: true });
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        return res.status(200).json({
            message: 'User updated successfully',
            user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    }
});

const deleteUserById = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        const user = await User.findByIdAndDelete(_id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        return res.status(200).json({
            message: 'User deleted successfully',
            user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    }
});

const updateUserAddress = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.user;
        if (!req.body.address) {
            return res.status(404).json({
                message: 'Please enter address'
            });
        }
        const response = await User.findByIdAndUpdate(_id, {
            $push: { addresses: req.body.address }
        }, { new: true });
        return res.status(200).json({
            message: 'Updated address successfully',
            response: response
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    }
});

const updateUserCart = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.user;
        const { p_id, quantity, color, images, price, title } = req.body;
        console.log(req.body);
        if (!_id || !quantity || !color) {
            return res.status(400).json({
                message: 'Please enter a quantity, a color and p_id'
            });
        }
        const user = await User.findById(_id);
        const alreadyCart = user?.carts?.find((element) => element.product.toString() === p_id && element.color === color);
        if (alreadyCart) {
            if (alreadyCart.color === color) {
                const response = await User.updateOne({ carts: { $elemMatch: alreadyCart } }, { $set: { 'carts.$.quantity': quantity } }, { new: true });
                return res.status(200).json({
                    message: 'Updated quantity',
                    UpdatedUser: response
                });
            } else {
                console.log(1)
                const response = await User.updateOne({ carts: { $elemMatch: alreadyCart } }, {
                    $set:
                    {
                        'carts.$.quantity': quantity,
                        'carts.$.color': color,
                        'carts.$.images': images,
                        'carts.$.price': price,
                        'carts.$.title': title
                    }
                }, { new: true });
                console.log(response);
                return res.status(200).json({
                    message: 'Updated cart successfully',
                    UpdatedUser: response
                });
            }
        } else {
            console.log(2)
            const user = await User.findByIdAndUpdate(_id, {
                $push: { carts: { product: p_id, color, quantity, price, images, color, title } }
            }, { new: true });
            return res.status(200).json({
                message: 'Updated cart successfully',
                response: user
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    }
});

const removeUserCart = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.user;
        const { _id: p_id, color } = req.params;
        const user = await User.findById(_id);
        const alreadyCart = user?.carts?.find((element) => element.product.toString() === p_id);
        if (!alreadyCart) {
            return res.status(200).json({
                message: 'Updated your cart'
            });
        }
        const response = await User.findByIdAndUpdate(_id, {
            $pull: { carts: { product: p_id } }
        }, { new: true });
        return res.status(200).json({
            message: 'Remove cart successfully',
            cart: response
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    }
});

module.exports = {
    register,
    finalRegister,
    login,
    getUSer,
    newAccessToken,
    logout,
    forgotPassword,
    resetPassword,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    updateUserAddress,
    updateUserCart,
    updateCurrentUser,
    removeUserCart,
    oauth2LoginSuccessController,
    getOauth2User
}