const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var roleSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true,
        unique: true,
    },
});

//Export the model
module.exports = mongoose.model('Role', roleSchema);