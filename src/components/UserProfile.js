import { LoggedContext } from '../LoggedInUser';
import { useState, useContext, useEffect } from "react";
import RecipeList from "./RecipeList";


const UserProfile = () => {

    const { user, setUser } = useContext(LoggedContext);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [settings_win, setSettingsWin] = useState(false);

    let avatars = ["fa-solid fa-user-secret", "fa-solid fa-user", "fa-solid fa-user-tie",
        "fa-solid fa-user-ninja", "fa-solid fa-user-graduate",
        "fa-solid fa-user-astronaut", "fa-solid fa-poo", "fa-brands fa-suse",
        "fa-solid fa-skull", "fa-solid fa-dragon", "fa-solid fa-peace", "fa-solid fa-burger",
        "fa-solid fa-hippo", "fa-solid fa-ghost", "fa-solid fa-robot"]//<i class=></i>

    useEffect(() => {
        const fetchRecipesList = async () => {
            setIsPending(true);
            const response = await fetch('/api/recipes/userrecipes/' + user._id);
            const json = await response.json();
            console.log("recipes", json);
            if (response.ok) {
                setRecipes(json);
                if (user.collections.length > 0) {
                    console.log('get fav', user.collections);
                    const response = await fetch('/api/recipes/recipes/favorites/', {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(user.collections)
                    });
                    const json = await response.json();
                    console.log('favorites', json);
                    setFavorites(json);
                }
                setIsPending(false);
            } else {
                setError(true);
                console.log(error);
            }
        }



        fetchRecipesList();
    }, []);

    const Avatar = async (avatar_img) => {
        console.log(avatar_img);
        const response = await fetch('/api/recipes/users/' + user._id, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ avatar: avatar_img })
        });
        const json = await response.json();
        if (response.ok) {
            fetchUser();
        }
    }

    const fetchUser = async () => {
        const response = await fetch('/api/recipes/users/' + user._id);
        const json = await response.json();
        console.log('users', json);
        if (response.ok) {
            setIsPending(false);
            setUser({ ...user, avatar: json.avatar });
        } else {
            setError(true);
            console.log(error);
        }
    }

    const handleClose = () => {
        setSettingsWin(false);
    }

    const handleOpen = () => {
        setSettingsWin(true);
        console.log(settings_win);
    }

    return (
        <div className="recipe-details">
            {isPending && <div><i class="fa-solid fa-spinner fa-spin-pulse"></i> Loading...</div>}
            {error && <div><i class="fa-solid fa-triangle-exclamation fa-beat"></i> Error...</div>}
            {user && (
                <div>
                    <h2>{user.fname} {user.lname}</h2>
                    <div className='avatar'>
                        <i class={user.avatar}></i>
                    </div>
                    {!settings_win && <button type="button" style={{
                        position: "fixed",
                        right: "0px",
                        top:"55px"
                    }} onClick={() => handleOpen()}><i class="fa-solid fa-gear"></i></button>}

                    {settings_win && <div className="settings">
                        <button type="button" style={{ width: "36px", color: "#000000" }} onClick={() => handleClose()}><i class="fa-regular fa-circle-xmark"></i></button>
                        <div>
                            {avatars.map((avatar) => (
                                <button type="button" onClick={() => Avatar(avatar)}>
                                    <i class={avatar}></i>
                                </button>
                            ))}
                        </div>
                    </div>}

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
                    {(favorites.length > 0) && <div>
                        <RecipeList recipes={favorites} title='my favorites' />
                    </div>
                    }

                </div>
            )}
        </div>
    );
}

export default UserProfile;