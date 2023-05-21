const express = require('express');
const upload = require('../middleware/upload');
const { createRecipe, getAllRecipes, getRecipe, deleteRecipe, updateRecipe, 
    getUser, getUsers, createUser, deleteUser, updateUser,getAuthors,getUserRecipes,
    getSearchRecipes,addToCollection,deleteFromCollection,getfavorites } = require('../controllers/recipeControllers');
const router = express.Router();

//----- Recipes -----
router.get('/recipes', getAllRecipes);

router.get('/authors', getAuthors);

router.get('/users', getUsers);

router.get('/recipes/:id', getRecipe);

router.get('/userrecipes/:id', getUserRecipes);

router.get('/searchrecipes/:id', getSearchRecipes);

router.post('/recipes',upload.single('img'), createRecipe);

router.delete('/recipes/:id', deleteRecipe);

router.patch('/recipes/:id', updateRecipe);

router.post('/recipes/favorites/',getfavorites);

//----- Users -----

router.get('/users/:id', getUser);

router.post('/users/', createUser);

router.delete('/users/:id', deleteUser);

router.patch('/users/:id', updateUser);

router.post('/users/collections/',addToCollection);

router.post('/users/delcollections/',deleteFromCollection);

module.exports = router;