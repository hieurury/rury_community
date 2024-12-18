const mongoose = require('mongoose');
require('dotenv').config();
async function connect() {
    try {
        const url = process.env.DATABASE_URL;
        await mongoose.connect(url)
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log(`Connect failure!!!`, error);
    }
}

module.exports = { connect };