const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    note: {
        type: String,
        required: false
    },
    time: {
        type: Number,
        required: true
    },
    temp: {
        type: Number,
        required: false
    },
    img: {
        type: String,
        required: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Recipe', RecipesSchema);

