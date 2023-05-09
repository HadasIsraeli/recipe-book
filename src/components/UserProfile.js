import { LoggedContext } from '../LoggedInUser';
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import RecipeList from "./RecipeList";


const UserProfile = () => {

    const { user, setUser } = useContext(LoggedContext);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [favorites, setFavorites] = useState([]);


    useEffect(() => {
        const fetchRecipesList = async () => {
            const response = await fetch('/api/recipes/userrecipes/' + user._id);
            const json = await response.json();
            console.log("recipes", json);
            if (response.ok) {
                setRecipes(json);
                if (user.collections.length > 0) {
                    console.log('get fav',user.collections);
                    const response = await fetch('/api/recipes/recipes/favorites/', {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(user.collections)
                    });
                    const json = await response.json();
                    console.log('favorites',json);
                    setFavorites(json);
                }
            } else {
                // setError(true);
                console.log(error);
            }
        }



        fetchRecipesList();
    }, []);

    return (
        <div className="recipe-details">
            {isPending && <div>Loading...</div>}
            {error && <div>Error...</div>}
            {user && (
                <div>
                    <h2>{user.fname} {user.lname}</h2>
                    <p><i class="fa-solid fa-envelope"></i> {user.email}</p>
                    <p><i class="fa-solid fa-book"></i> recipes: {user.recipes.length}</p>
                    <p><i class="fa-solid fa-star"></i> favorites: {user.collections.length}</p>
                    {user.author && <p><i class="fa-solid fa-pen"></i> author</p>}
                    {user.manager && <p><i class="fa-sharp fa-solid fa-user-tie"></i> manager</p>}
                    {(recipes.length > 0) &&
                        <RecipeList recipes={recipes} title='my recipes' />

                        // <div>recipes:
                        //     <div className="recipe-card">
                        //         {recipes.map((recipe) => (
                        //             <NavLink to={`/recipes/${recipe._id}`} style={{ textDecoration: 'none' }}>
                        //                 <div className="polaroid-card" key={recipe._id} >

                        //                     <div className="image-container">
                        //                         {!recipe.img && <img src="https://handletheheat.com/wp-content/uploads/2015/03/Best-Birthday-Cake-with-milk-chocolate-buttercream-SQUARE.jpg"
                        //                             alt="your-image-description" />}
                        //                         {recipe.img && <img src={recipe.img} alt={recipe.title} />}
                        //                     </div>
                        //                     <div className="caption-container">
                        //                         <h2>{recipe.title}</h2>
                        //                         <p>Written by: {recipe.author}</p>
                        //                     </div>

                        //                 </div>
                        //             </NavLink>
                        //         ))}
                        //     </div></div>
                    }
                    {(favorites.length > 0) &&<div>
                       <RecipeList recipes={favorites} title='my favorites' />
                       </div>
                    }

                </div>
            )}
        </div>
    );
}

export default UserProfile;