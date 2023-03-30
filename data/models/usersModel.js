const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    author: {
        type: Boolean,
        required: true
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    recipes: { type: Array, required: false },
    collections: { type: Array, required: false },

}, { timestamps: true })

module.exports = mongoose.model('Users', UsersSchema);

