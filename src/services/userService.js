const User = require('../models/User');

const pushToField = async (id, itemId, fieldName) => {
    const user = await User.findById(id);
    if (user[fieldName].some(x => x == itemId)) {
        //Change error message accordingly
        throw new Error('Item already exists');
    }
    user[fieldName].push(itemId);
    return user.save({ validateBeforeSave: false });
}

const removeFromField = async (id, itemId, fieldName) => {
    const user = await User.findById(id);
    if (!user[fieldName].some(x => x.toString() == itemId.toString())) {
        //Change error message accordingly
        throw new Error('Item not in field');
    }
    user[fieldName].pull(itemId);
    return user.save({ validateBeforeSave: false });
}

const follow = async (username, followerId) => {
    const user = await User.findOne({ username });
    if (user.followers.some(x => x.toString() === followerId.toString())) {
        //Change error message accordingly
        throw new Error('Already following');
    }
    user.followers.push(followerId);
    return user.save({ validateBeforeSave: false });
}
const unfollow = async (username, followerId) => {
    return User.findOneAndUpdate({ username }, { $pull: { followers: followerId } });
}

const getAndPopulate = async (username, field) => {
    const pattern = new RegExp(`^${username}$`, 'i');
    let user = await User.findOne({ username: { $regex: pattern } })
    return User.findOne({ username: { $regex: pattern } }).populate(field).lean();
}
const getOne = async (id) => {
    return User.findById(id).lean();
}
const updateOne = async (id, data) => {
    return User.findOneAndUpdate({ _id: id }, data, { new: true });
}
module.exports = {
    pushToField,
    getAndPopulate,
    follow,
    unfollow,
    getOne,
    removeFromField,
    updateOne
}