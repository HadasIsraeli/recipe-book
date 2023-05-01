import { LoggedContext } from '../LoggedInUser';
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState, useContext,useEffect } from "react";

const UserProfile = () => {

    const { user, setUser } = useContext(LoggedContext);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipesList = async () => {
            const response = await fetch('/api/recipes/userrecipes/' + user._id);
            const json = await response.json();
            console.log("recipes", json);
            if (response.ok) {
                setRecipes(json);
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
                    <p>{user.email}</p>
                    <p>recipes: {user.recipes.length}</p>
                    <p>collections: {user.collections.length}</p>
                    {user.author && <p>author</p>}
                    {user.manager && <p>manager</p>}
                    {(recipes.length > 0) && <div>recipes:
                        <div className="recipe-card">
                            {recipes.map((recipe) => (
                                <NavLink to={`/recipes/${recipe._id}`} style={{ textDecoration: 'none' }}>
                                    <div className="polaroid-card" key={recipe._id} >

                                        <div className="image-container">
                                            {!recipe.img && <img src="https://handletheheat.com/wp-content/uploads/2015/03/Best-Birthday-Cake-with-milk-chocolate-buttercream-SQUARE.jpg"
                                                alt="your-image-description" />}
                                            {recipe.img && <img src={recipe.img} alt={recipe.title} />}
                                        </div>
                                        <div className="caption-container">
                                            <h2>{recipe.title}</h2>
                                            <p>Written by: {recipe.author}</p>
                                        </div>

                                    </div>
                                </NavLink>
                            ))}
                        </div></div>}
                </div>
            )}
        </div>
    );
}

export default UserProfile;