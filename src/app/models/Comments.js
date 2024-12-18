const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Comment', Comment);