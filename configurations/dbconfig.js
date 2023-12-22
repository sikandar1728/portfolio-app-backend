require('dotenv').config();

const mongoose = require('mongoose');

exports.connectDatabase = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database Connected: ${con.connection.host}`);
    } catch (error) {
        throw error;
    }
}