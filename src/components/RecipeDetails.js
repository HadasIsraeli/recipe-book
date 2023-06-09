import { useParams } from "react-router-dom";
import useFetch from './useFetch';
import { useHistory } from "react-router-dom";
import { LoggedContext } from '../LoggedInUser';
import { useContext } from 'react';


const RecipeDetails = () => {
    const { id } = useParams();
    const { data: recipe, error, isPending } = useFetch('https://recipe-book-server.onrender.com/api/recipes/recipes/' + id);
    const history = useHistory();
    const { user, setUser } = useContext(LoggedContext);//global users, to know who is logged in all the app pages

    const handleDelete = () => {
        fetch('https://recipe-book-server.onrender.com/api/recipes/recipes/' + recipe._id, {
            method: 'DELETE',
        }).then(() => {
            history.push('/');
        });
    }

    const handleUpdate = () => {
        history.push('/update/' + recipe._id);
    }

    const handleCollection = (type) => {
        if (user._id === "") {
            alert('Please login or register');
        }
        else {
            let body = {
                _id: recipe._id,
                user_id: user._id
            }
            switch (type) {
                case 'add':
                    fetch('https://recipe-book-server.onrender.com/api/recipes/users/collections/', {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body)
                    }).then(() => {
                        fetchUser();
                    });

                    break;

                case 'delete':
                    fetch('https://recipe-book-server.onrender.com/api/recipes/users/delcollections/', {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body)
                    }).then(() => {
                        fetchUser();
                    });
                    break;
            }
        }
    }

    const fetchUser = async () => {
        const response = await fetch('https://recipe-book-server.onrender.com/api/recipes/users/' + user._id);
        const json = await response.json();
        if (response.ok) {
            // setIsPending(false);
            setUser({ ...user, collections: json.collections });
        } else {
            // setError(true);
        }
    }

    return (
        <div className="recipe-details">
            {isPending && <div><i class="fa-solid fa-spinner fa-spin-pulse"></i> Loading...</div>}
            {error && <div>Error...</div>}
            {recipe && (
                <article>
                    <h2>{recipe.title}</h2>
                    {!user.collections.includes(recipe._id) && <button onClick={() => handleCollection('add')}><i class="fa-regular fa-star"></i></button>}
                    {user.collections.includes(recipe._id) && <button onClick={() => handleCollection('delete')}><i class="fa-solid fa-star"></i></button>}

                    <p>Written By: {recipe.author}</p>
                    {!recipe.img && <i class="fa-solid fa-utensils" style={{ 'font-size': '30px' }}></i>}
                    {recipe.img && recipe.img.includes('https://') && <img src={recipe.img} alt={recipe.title} />}
                    {recipe.img && !recipe.img.includes('https://') && <img src={'https://recipe-book-server.onrender.com/' + recipe.img} alt={recipe.title} />}

                    <br />
                    <h5>Oven Temperature: {recipe.temp} C</h5>
                    <h5>Total Time: {recipe.time} min</h5>
                    <h4>Ingredients:</h4>
                    <div>{recipe.ingredients.map(item => <li>{item}</li>)}</div>

                    <h4>Instructions:</h4>
                    <div>{recipe.body}</div>
                    {recipe.note && <h4>Notes:</h4>}
                    {recipe.note && <div>{recipe.note}</div>}

                    {(user.manager || ((user.fname + ' ' + user.lname).toString() === recipe.author)) && <button onClick={handleDelete}>Delete</button>}
                    {(user.manager || ((user.fname + ' ' + user.lname).toString() === recipe.author)) && <button onClick={handleUpdate}>Edit</button>}
                </article>
            )}
        </div>
    );
}

export default RecipeDetails;