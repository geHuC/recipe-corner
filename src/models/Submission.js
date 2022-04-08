const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is a reqired field'],
        minlength: [3, 'Title must be at leatst 3 characters long']
    },
    imageUrl: {
        type: String,
        required: [true, 'Image is reqired'],
    },
    thumbUrl: {
        type: String,
        required: [true, 'Image is reqired'],
    },
    ingredients: {
        type: [{
            qty: {
                type: String
            },
            product: {
                type: String,
                minlength: [2, 'A step must be at least 2 characters long'],
                maxlength: [350, 'A step cannot be longer than 350 characters']
            }
        }]
    },
    steps: {
        type: [{
            step: {
                type: Number
            },
            instruction: {
                type: String,
                minlength: [2, 'A step must be at least 2 characters long'],
                maxlength: [350, 'A step cannot be longer than 350 characters']
            }
        }]
    },
    views: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
        required: [true, 'Description is a reqired field'],
        minlength: [8, 'Description must be at least 8 characters long'],
        maxlength: [350, 'Description cannot be longer than 350 characters']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    favourites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: [],
    }],
}, { timestamps: true });

const Submission = mongoose.model('Submission', schema);

module.exports = Submission;