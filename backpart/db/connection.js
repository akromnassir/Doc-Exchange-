const mongoose = require("mongoose");

const connectMongoDB = async (url) => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = connectMongoDB;
