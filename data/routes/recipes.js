const express = require('express');
const { createRecipe, getAllRecipes, getRecipe, deleteRecipe, updateRecipe, 
    getUser, getUsers, createUser, deleteUser, updateUser,getAuthors,getUserRecipes,
    getSearchRecipes,addToCollection,deleteFromCollectio } = require('../controllers/recipeControllers');
const router = express.Router();

//----- Recipes -----
router.get('/recipes', getAllRecipes);

router.get('/authors', getAuthors);

router.get('/users', getUsers);

router.get('/recipes/:id', getRecipe);

router.get('/userrecipes/:id', getUserRecipes);

router.get('/searchrecipes/:id', getSearchRecipes);

router.post('/recipes', createRecipe);

router.delete('/recipes/:id', deleteRecipe);

router.patch('/recipes/:id', updateRecipe);

//----- Users -----

router.get('/users/:id', getUser);

router.post('/users/', createUser);

router.delete('/users/:id', deleteUser);

router.patch('/users/:id', updateUser);

router.post('/users/collections/',addToCollection);

router.post('/users/delcollections/',deleteFromCollectio);

module.exports = router;