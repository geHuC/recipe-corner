const Submission = require('../models/Submission');

const create = async (data) => {
    return Submission.create(data);
}

const getCount = async () => {
    return Submission.count({});
}

const getAll = async (sortParams = { createdAt: 'desc' }, skip = 0, pagesize = 20) => {
    return Submission.find().populate('author').sort(sortParams).skip(skip).limit(pagesize).lean();
}
const searchAll = async (seachParams = {}, sortParams = { createdAt: 'desc' }, skip = 0, pagesize = 20) => {
    return Submission.find(seachParams).populate('author').sort(sortParams).skip(skip).limit(pagesize).lean();
}

const getAllMatching = async (array, sortParams = { createdAt: 'desc' }) => {
    return Submission.find({ 'author': { $in: array } }).populate('author').sort(sortParams).lean();
}
const getTagged = async (tag, sortParams = { createdAt: 'desc' }) => {
    return Submission.find({ 'category': tag }).populate('author').sort(sortParams).lean();
}

const getOne = async (slug) => {
    return await Submission.findOne({ slug: slug }).populate('author').lean();
}
const updateViews = async (id) => {
    return Submission.findOneAndUpdate({ _id: id }, { $inc: { views: 1 } });
}
const deleteOne = async (id, ownerId) => {
    return Submission.findOneAndDelete({ _id: id, author: ownerId });
}
const updateOne = async (id, ownerId, data) => {
    return Submission.findOneAndUpdate({ _id: id, author: ownerId }, data, { runValidators: true, new: true }).populate('author').lean();
}
const getRandom = async () => {
    return Submission.aggregate().sample(1);
}
const pushToField = async (id, userId, fieldName) => {
    const item = await Submission.findById(id);
    if (item[fieldName].some(x => x._id == userId)) {
        throw new Error('Already booked in this hotel');
    }
    item[fieldName].push(userId);
    return item.save();
}
const favourite = async (id, userId, fieldName) => {
    const item = await Submission.findById(id);
    if (item.author == userId) {
        throw new Error('Cannot vote on your post')
    }
    if (item[fieldName].some(x => x._id == userId)) {
        throw new Error('Already favourited post');
    }
    item[fieldName].push(userId);
    return item.save();
}
const unfavourite = async (id, userId, fieldName) => {
    const item = await Submission.findById(id);
    if (!item[fieldName].some(x => x._id == userId)) {
        throw new Error('Not favourited');
    }
    item[fieldName].pull(userId);
    return item.save();
}
module.exports = {
    create,
    getAll,
    getOne,
    deleteOne,
    updateOne,
    pushToField,
    favourite,
    unfavourite,
    getCount,
    updateViews,
    getRandom,
    getAllMatching,
    getTagged,
    searchAll
}