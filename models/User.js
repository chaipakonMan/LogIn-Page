
const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    userName: String,
    password: String,
});

module.exports = mongoose.model('User', userSchema);
