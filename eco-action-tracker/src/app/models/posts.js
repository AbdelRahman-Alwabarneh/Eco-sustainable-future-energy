const mongoose = require('mongoose');

// Define the Comment Schema
const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    replies: [
        {
            author: {
                type: mongoose.Schema.Types.ObjectId, ref: 'User',
                required: true
            },
            content: {
                type: String,
                required: true
            },
            likes: {
                type: Number,
                default: 0
            },
            time: {
                type: Date,
                default: Date.now
            }
        }
    ],
    time: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Define the Post Schema
const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    time: {
        type: Date,
        required: true,
        default: Date.now
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [commentSchema] // Embed the Comment Schema
}, { timestamps: true });

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

module.exports = Post; 