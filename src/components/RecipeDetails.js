import { useParams } from "react-router-dom";
import useFetch from './useFetch';
import { useHistory } from "react-router-dom";
import { LoggedContext } from '../LoggedInUser';
import { useContext } from 'react';


const RecipeDetails = () => {
    const { id } = useParams();
    const { data: recipe, error, isPending } = useFetch('/api/recipes/recipes/' + id);
    const history = useHistory();
    const { user, setUser } = useContext(LoggedContext);//global users, to know who is logged in all the app pages


    const handleDelete = () => {
        fetch('/api/recipes/recipes/' + recipe._id, {
            method: 'DELETE',
        }).then(() => {
            history.push('/Home');
        });
    }

    const handleUpdate = () => {
        console.log(recipe);
        history.push('/update/' + recipe._id);
    }

    return (
        <div className="recipe-details">
            {isPending && <div>Loading...</div>}
            {error && <div>Error...</div>}
            {recipe && (
                <article>
                    <h2>{recipe.title}</h2>
                    <p>Written By: {recipe.author}</p>
                    {!recipe.img && <img src="https://handletheheat.com/wp-content/uploads/2015/03/Best-Birthday-Cake-with-milk-chocolate-buttercream-SQUARE.jpg"
                        alt="your-image-description" />}
                    {recipe.img && <img src={recipe.img} alt={recipe.title} />}

                    {recipe.temp && <h5>Oven Temperature: {recipe.temp} C</h5>}
                    <h5>Total Time: {recipe.time} min</h5>
                    <h4>Ingredients:</h4>
                    <div>{recipe.ingredients.map(item => <li>{item}</li>)}</div>

                    <h4>Instructions:</h4>
                    <div>{recipe.body}</div>
                    {recipe.note && <h4>Notes:</h4>}
                    {recipe.note && <div>{recipe.note}</div>}

                    {(user.manager || ((user.fname + ' ' + user.lname).toString() == recipe.author)) && <button onClick={handleDelete}>Delete</button>}
                    {(user.manager || ((user.fname + ' ' + user.lname).toString() == recipe.author)) && <button onClick={handleUpdate}>Update</button>}
                </article>
            )}
        </div>
    );
}

export default RecipeDetails;