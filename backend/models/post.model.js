const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postModel = new Schema({
    username: { type: String, required: true},
    description: { type: String, required: true},
    date: { type: Date, required: true},
}, {
    timestamps:true
});

const Post = mongoose.model('Post', postModel);
module.exports = Post;
