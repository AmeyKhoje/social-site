const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: { type: String },
    description: { type: String },
    image: { type: String },
    createdAt: { type: Date, default: Date.now() },
    hashtags: [{ type: String }],
    likes: { type: Number },
    author: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
})

module.exports = mongoose.model('Post', postSchema)