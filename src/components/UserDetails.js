
import { useParams } from "react-router-dom";
import useFetch from './useFetch';
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import RecipeList from "./RecipeList";


const UserDetails = () => {
    const { id } = useParams();
    const [recipes, setRecipes] = useState([]);
    const history = useHistory();

    const [user, setUser] = useState();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAuthorsList = async () => {
            const response = await fetch('/api/recipes/users/' + id);
            const json = await response.json();
            console.log(json);
            if (response.ok) {
                setIsPending(false);
                setUser(json);
                fetchRecipesList();
            } else {
                setError(true);
                console.log(error);
            }
        }

        fetchAuthorsList();
    }, []);

    const fetchRecipesList = async () => {
        const response = await fetch('/api/recipes/userrecipes/' + id);
        const json = await response.json();
        console.log("recipes", json);
        if (response.ok) {
            setRecipes(json);
        } else {
            // setError(true);
            console.log(error);
        }
    }

    console.log(user);
    return (
        <div className="recipe-details">
            {isPending && <div>Loading...</div>}
            {error && <div>Error...</div>}
            {user && (
                <div>
                    <h2>{user.fname} {user.lname}</h2>
                    <p>{user.email}</p>
                    <p>recipes: {user.recipes.length}</p>
                    <p>collections: {user.collections.length}</p>
                    {user.author && <p>author</p>}
                    {user.manager && <p>manager</p>}
                    {(user.recipes.length > 0) &&
                        <RecipeList recipes={recipes} title='recipes' />

                        //         <div>recipes:
                        //             <div className="recipe-card">
                        //     {recipes.map((recipe) => (
                        //         <NavLink to={`/recipes/${recipe._id}`} style={{ textDecoration: 'none' }}>
                        //             <div className="polaroid-card" key={recipe._id} >

                        //                 <div className="image-container">
                        //                     {!recipe.img && <img src="https://handletheheat.com/wp-content/uploads/2015/03/Best-Birthday-Cake-with-milk-chocolate-buttercream-SQUARE.jpg"
                        //                         alt="your-image-description" />}
                        //                     {recipe.img && <img src={recipe.img} alt={recipe.title} />}
                        //                 </div>
                        //                 <div className="caption-container">
                        //                     <h2>{recipe.title}</h2>
                        //                     <p>Written by: {recipe.author}</p>
                        //                 </div>

                        //             </div>
                        //         </NavLink>
                        //     ))}
                        // </div></div>
                    }
                </div>
            )}
        </div>
    );
}

export default UserDetails;