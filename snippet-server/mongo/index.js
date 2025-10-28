const mongoose = require('mongoose');

const { username, password, projectname } = require('../config.json');
const mongoURL = `mongodb+srv://${username}:${password}@cluster0.ykzrlh7.mongodb.net/${projectname}?retryWrites=true&w=majority`;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log('Connected to Mongo DB');
    } catch (error) {
        console.log(error);
    }
};

module.exports = { connectDB };
