const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    products: [{
        type: mongoose.Types.ObjectId,
        ref: 'Product',
    }],
    images: {
        type: Array
    },
    brands: [{
        type: mongoose.Types.ObjectId,
        ref: 'Brand',
    }]
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('productCategory', productCategorySchema);