const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Blog = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    like: {
        type: Number,
        default: 0
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: []
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Blog', Blog);