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
    category: {
        type: String,
        required: [true, 'Category is reqired'],
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
                minlength: [2, 'A product must be at least 2 characters long'],
                maxlength: [50, 'A product cannot be longer than 50 characters']
            }
        }]
    },
    instructions: {
        type: String,
        required: [true, 'Instructions is a reqired field'],
        minlength: [8, 'Instructions must be at least 8 characters long'],
        maxlength: [1000, 'Instructions cannot be longer than 1000 characters']
    },
    views: {
        type: Number,
        default: 0,
    },
    preptime: {
        type: Number,
        default: 0,
    },
    cooktime: {
        type: Number,
        default: 0,
    },
    portions: {
        type: String,
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