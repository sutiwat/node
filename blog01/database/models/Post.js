const mongoose = require('mongoose');

//Users, Posts, products

const PostSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    content: String,
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    image: String,
    createdAt:{
        type: Date,
        default: new Date()
    }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;