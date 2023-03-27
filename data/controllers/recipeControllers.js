const Recipe = require('../models/recipesModel');
const mongoose = require('mongoose');

const getAllRecipes = async (req, res) => {
    const allRecipes = await Recipe.find({})
        .sort({ createdAt: -1 });
    res.status(200).json(allRecipes);
}

const getRecipe = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such recipe id' });
    }
    const recipe = await Recipe.findById(id);
    if (!recipe) {
        return res.status(404).json({ error: 'no recipe found' });
    }
    res.status(200).json(recipe);
}

const createRecipe = async (req, res) => {
    const { title, body, author, ingredients, note, time, temp, img } = req.body;

    try {
        const recipe = await Recipe.create({ title, body, author, ingredients, note, time, temp, img });
        res.status(200).json(recipe);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteRecipe = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such recipe id' });
    }
    const recipe = await Recipe.findOneAndDelete({ _id: id });
    if (!recipe) {
        return res.status(404).json({ error: 'no recipe found' });
    }
    res.status(200).json(recipe);
}

const updateRecipe = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such recipe id' });
    }
    const recipe = await Recipe.findOneAndUpdate(
        { _id: id },
        { ...req.body }
    );
    if (!recipe) {
        return res.status(404).json({ error: 'no recipe found' });
    }
    res.status(200).json(recipe);
}

module.exports = {
    createRecipe,
    getAllRecipes,
    getRecipe,
    deleteRecipe,
    updateRecipe
}