
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
            const response = await fetch('https://recipe-book-server.onrender.com/api/recipes/users/' + id);
            const json = await response.json();
            if (response.ok) {
                setIsPending(false);
                setUser(json);
                fetchRecipesList();
            } else {
                setError(true);
            }
        }

        fetchAuthorsList();
    }, []);

    const fetchRecipesList = async () => {
        const response = await fetch('https://recipe-book-server.onrender.com/api/recipes/userrecipes/' + id);
        const json = await response.json();
        if (response.ok) {
            setRecipes(json);
        } else {
            // setError(true);
        }
    }

    const makeAuthor = async () => {
        const response = await fetch('https://recipe-book-server.onrender.com/api/recipes/users/' + user._id, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ author: !user.author })
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
            // setIsPending(false);
            setUser({ ...user, author: json.author });
        } else {
            // setError(true);
        }
    }

    const handleDelete = () => {
        fetch('https://recipe-book-server.onrender.com/api/recipes/users/' + user._id, {
            method: 'DELETE',
        }).then(() => {
            history.push('/users');
        });
    }

    return (
        <div className="profile-details">
            {isPending && <div><i class="fa-solid fa-spinner fa-spin-pulse"></i> Loading...</div>}
            {error && <div>Error...</div>}
            {user && (
                <div className="profile-info">
                    <h2>{user.fname} {user.lname}</h2>
                    <div className='user-details'>
                        <div className='avatar'>
                            <i class={user.avatar}></i>
                        </div>
                        <div style={{margin:"0 0 0 15px"}}>
                            <p><i class="fa-solid fa-envelope"></i> {user.email}</p>
                            <p><i class="fa-solid fa-book"></i> recipes: {user.recipes.length}</p>
                            <p><i class="fa-solid fa-star"></i> favorites: {user.collections.length}</p>
                            {user.author && <p><i class="fa-solid fa-pen"></i> author</p>}
                            {user.manager && <p><i class="fa-sharp fa-solid fa-user-tie"></i> manager</p>}
                        </div>
                    </div>
                    {(user.recipes.length > 0) &&
                        <RecipeList recipes={recipes} title='recipes' />
                    }
                    {!user.author && <button onClick={makeAuthor}>make Author</button>}
                    {user.author && <button onClick={makeAuthor}>remove Author</button>}
                    <button onClick={handleDelete}>Delete User</button>


                </div>
            )}
        </div>
    );
}

export default UserDetails;