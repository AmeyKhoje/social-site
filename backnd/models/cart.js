const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const cartSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true, unique: true },
    price: { type: String, required: true }
})

cartSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Cart', cartSchema)