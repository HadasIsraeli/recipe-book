import { useParams } from "react-router-dom";
import useFetch from './useFetch';
import { useHistory } from "react-router-dom";


const RecipeDetails = () => {
    const { id } = useParams();
    const { data: recipe, error, isPending } = useFetch('/api/recipes/' + id);
    const history = useHistory();


    const handleDelete = () => {
        fetch('/api/recipes/' + recipe._id, {
            method: 'DELETE',
        }).then(() => {
            history.push('/');
        });
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

                    <button onClick={handleDelete}>Delete</button>
                </article>
            )}
        </div>
    );
}

export default RecipeDetails;