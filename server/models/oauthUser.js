const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var oauthUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    oauth2Id: {
        type: Number,
    },
    role: {
        type: String,
        default: 'user',
    },
    typeLogin: {
        type: String,
    },
    tokenLogin: {
        type: String,
    },
    avtUrl: {
        type: String,
    },
    carts: [{
        product: { type: mongoose.Types.ObjectId, ref: 'Product' },
        quantity: Number,
        color: String,
        price: Number,
        title: String,
        images: Array
    }],
});



//Export the model
module.exports = mongoose.model('OauthUser', oauthUserSchema);