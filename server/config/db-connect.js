const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URL);
        if (db.connection.readyState === 1) {
            console.log("Connected to MongoDB");
        } else {
            console.log("Error connecting to MongoDB");
        }
    } catch (error) {
        console.log("Connection error!!");
        throw new Error(error);
    }
};

module.exports = dbConnection;
