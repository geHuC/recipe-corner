const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minlength: [5, 'Username must be at leats 5 characters long'],
        validate: [/^[a-zA-Z0-9_]+$/, 'Username can contain only alphanumeric characters and undescore "_"']
    },
    fullname: {
        type: String,
        required: [true, 'Full name is required'],
        minlength: [5, 'Full name must be at least 5 characters long'],
        validate: [/^[a-zA-Z0-9 ]+$/, 'Full name can contain only letters']
    },
    bio: {
        type: String,
        maxlenght: [350, 'Bio cannot be longer than 350 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
    },
    avatar: {
        type: String,
        default: '/static/noAvatar.png'
    },
    submissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission',
        default: []
    }],
    favourites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission',
        default: []
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
});

//check if user exists

//Hash the password
userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        return bcrypt.hash(this.password, SALT_ROUNDS)
            .then(hash => {
                this.password = hash;
                return next();
            });
    } else {
        return next();
    }
});

//Validate password
userSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;