const express = require('express');
const { createRecipe,
    getAllRecipes,
    getRecipe,
    deleteRecipe,
    updateRecipe } = require('../controllers/recipeControllers');
const router = express.Router();

router.get('/', getAllRecipes);

router.get('/:id', getRecipe);

router.post('/', createRecipe);

router.delete('/:id', deleteRecipe);

router.patch('/:id', updateRecipe);

module.exports = router;