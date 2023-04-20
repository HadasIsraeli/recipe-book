const Recipe = require('../models/recipesModel');
const Author = require('../models/authorsModel');
const User = require('../models/usersModel');
const mongoose = require('mongoose');

const getAllRecipes = async (req, res) => {
    const allRecipes = await Recipe.find({})
        .sort({ createdAt: -1 });
    res.status(200).json(allRecipes);
}

const getRecipe = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'getRecipe no such recipe id' });
    }
    const recipe = await Recipe.findById(id);
    if (!recipe) {
        return res.status(404).json({ error: 'getRecipe no recipe found' });
    }
    res.status(200).json(recipe);
}

const createRecipe = async (req, res) => {
    const { title, body, author, ingredients, note, time, temp, img, author_id } = req.body;

    try {
        const recipe = await Recipe.create({ title, body, author, ingredients, note, time, temp, img, author_id })
            .then(async result => {
                console.log(result, result._id.toString());
                await updateUser({ params: { id: author_id }, body: { $push: { recipes: result._id.toString() } } });
                res.status(200).json(recipe);
            }, err => {
                console.log(err);
                res.status(400).json({ error: error.message });
            });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteRecipe = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'deleteRecipe no such recipe id' });
    }
    const recipe = await Recipe.findOneAndDelete({ _id: id });
    if (!recipe) {
        return res.status(404).json({ error: 'deleteRecipe no recipe found' });
    }
    res.status(200).json(recipe);
}

const updateRecipe = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'updateRecipe no such recipe id' });
    }
    const recipe = await Recipe.findOneAndUpdate(
        { _id: id },
        { ...req.body }
    );
    if (!recipe) {
        return res.status(404).json({ error: 'updateRecipe no recipe found' });
    }
    res.status(200).json(recipe);
}

const getAuthors = async (req, res) => {
    const allAuthors = await Author.find({})
        .sort({ fname: 1 });
    res.status(200).json(allAuthors);
}

const getAuthor = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such author id' });
    }
    const author = await Author.findById(id);
    if (!recipe) {
        return res.status(404).json({ error: 'no author found' });
    }
    res.status(200).json(author);
}

const getUsers = async (req, res) => {
    const allUsers = await User.find({})
        .sort({ createdAt: -1 });
    res.status(200).json(allUsers);
}

const getUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'getUser no such User id' });
    }
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ error: 'getUser no User found' });
    }
    res.status(200).json(user);
}

const createUser = async (req, res) => {
    const { fname, lname, author, email, password } = req.body;

    try {
        const user = await User.create({ fname, lname, author, email, password });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'deleteUser no such user id' });
    }
    const user = await User.findOneAndDelete({ _id: id });
    if (!user) {
        return res.status(404).json({ error: 'deleteUser no user found' });
    }
    res.status(200).json(user);
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'updateUser no such user id' });
    }
    const user = await User.findOneAndUpdate(
        { _id: id },
        { ...req.body }
    );
    if (!user) {
        return res.status(404).json({ error: 'updateUser no user found' });
    }
    res.status(200).json(user);
}

module.exports = {
    createRecipe,
    getAllRecipes,
    getRecipe,
    deleteRecipe,
    updateRecipe,
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
    getAuthors
}