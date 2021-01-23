const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2
    },
}, {
    timestamps:true
});

const User = mongoose.model('User', userModel);
module.exports = User;