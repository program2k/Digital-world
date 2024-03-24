const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        unique: false
    },
    password: {
        type: String,
        // required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'manager', 'user'],
        default: 'admin',
    },
    carts: [{
        product: { type: mongoose.Types.ObjectId, ref: 'Product' },
        quantity: Number,
        color: String,
        price: Number,
        title: String,
        images: Array
    }],
    addresses: {
        type: Array,
        default: []
    },
    avatar: {
        type: String,
    },
    wishLists: [
        { type: mongoose.Types.ObjectId, ref: 'Product' },
    ],
    isActive: {
        type: Boolean,
        default: true
    },
    refreshToken: {
        type: String
    },
    passwordChangedAt: {
        type: String
    },
    passwordResetToken: {
        type: String
    },
    passwordTokenExpiredIn: {
        type: String
    },
    passwordResetTokenExpiredIn: {
        type: String
    },
    registerToken: {
        type: String
    },
    oauth2Id: {
        type: Number,
        default: 0
    },
    typeLogin: {
        type: String
    },
    tokenLogin: {
        type: String
    },
    avatarUrl: {
        type: String
    }
}, {
    timestamps: true
});
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods = {
    isCorrectPassword: async function (password) {
        return await bcrypt.compare(password, this.password);
    },
    isCorrectEmail: async function (email) {
        return await this.email === email;
    },
    createChangePasswordToken: async function () {
        const resetPasswordToken = crypto.randomBytes(32).toString('hex'); //he thap luc phan
        this.passwordResetToken = crypto.createHash('sha256').update(resetPasswordToken).digest('hex');
        this.passwordTokenExpiredIn = Date.now() + 15 * 60 * 1000;
        return resetPasswordToken;
    },
};

/**
 * Finds or creates a user based on the provided filter and defaults.
 *
 * @param {Object} filter - The filter to find the user.
 * @param {Object} defaults - The default values for the new user.
 * @return {Array} An array containing the user object and a boolean indicating if the user is new or not.
 */
userSchema.statics.findOrCreate = async function (filter, defaults) {
    const user = await this.findOne(filter);
    if (user) {
        return [user, false]; // Người dùng đã tồn tại
    } else {
        const newUser = new this(defaults);
        await newUser.save();
        return [newUser, true]; // Người dùng mới đã được tạo
    }
};

//Export the model
module.exports = mongoose.model('User', userSchema);