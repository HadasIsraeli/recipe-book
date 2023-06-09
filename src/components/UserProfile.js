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
        "fa-solid fa-hippo", "fa-solid fa-ghost", "fa-solid fa-robot"];

    useEffect(() => {
        const fetchRecipesList = async () => {
            setIsPending(true);
            const response = await fetch('https://recipe-book-server.onrender.com/api/recipes/userrecipes/' + user._id);
            const json = await response.json();
            if (response.ok) {
                setRecipes(json);
                if (user.collections.length > 0) {
                    const response = await fetch('https://recipe-book-server.onrender.com/api/recipes/recipes/favorites/', {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(user.collections)
                    });
                    const json = await response.json();
                    setFavorites(json);
                }
                setIsPending(false);
            } else {
                setError(true);
            }
        }



        fetchRecipesList();
    }, []);

    const Avatar = async (avatar_img) => {
        const response = await fetch('https://recipe-book-server.onrender.com/api/recipes/users/' + user._id, {
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
        const response = await fetch('https://recipe-book-server.onrender.com/api/recipes/users/' + user._id);
        const json = await response.json();
        if (response.ok) {
            setIsPending(false);
            setUser({ ...user, avatar: json.avatar });
        } else {
            setError(true);
        }
    }

    const handleClose = () => {
        setSettingsWin(false);
    }

    const handleOpen = () => {
        setSettingsWin(true);
    }

    return (
        <div className="profile-details">
            {isPending && <div><i class="fa-solid fa-spinner fa-spin-pulse"></i> Loading...</div>}
            {error && <div><i class="fa-solid fa-triangle-exclamation fa-beat"></i> Error...</div>}
            {user && (
                <div className="profile-info">
                    <h2 style={{ "font-size": "32px" }}>{user.fname} {user.lname}</h2>
                    <div className='user-details'>
                        <div>
                            <div className='avatar'>
                                <i class={user.avatar}></i>
                            </div>
                            {!settings_win && <button type="button" style={{
                                position: "revert",
                                left: "10px",
                                "font-size": "10px",

                            }} onClick={() => handleOpen()}><i class="fa-solid fa-images"></i></button>}
                        </div>

                        <div style={{margin:"0 0 0 15px"}}>
                            <p><i class="fa-solid fa-envelope"></i> {user.email}</p>
                            <p><i class="fa-solid fa-book"></i> recipes: {user.recipes.length}</p>
                            <p><i class="fa-solid fa-star"></i> favorites: {user.collections.length}</p>
                            {user.author && <p><i class="fa-solid fa-pen"></i> author</p>}
                            {user.manager && <p><i class="fa-sharp fa-solid fa-user-tie"></i> manager</p>}
                        </div>
                    </div>
                    {settings_win && <div className="settings">
                        <button type="button" style={{ width: "36px", color: "#000000" }} onClick={() => handleClose()}><i class="fa-regular fa-circle-xmark"></i></button>
                        <div style={{ overflow: "auto" }}>
                            {avatars.map((avatar) => (
                                <button type="button" onClick={() => Avatar(avatar)}>
                                    <i class={avatar}></i>
                                </button>
                            ))}
                        </div>
                    </div>}
                    {(recipes.length > 0) && <RecipeList recipes={recipes} title='my recipes' />}
                    {(favorites.length > 0) && <RecipeList recipes={favorites} title='my favorites' />}

                </div>
            )}
        </div>
    );
}

export default UserProfile;