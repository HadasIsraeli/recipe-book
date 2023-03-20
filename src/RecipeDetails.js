import { useParams } from "react-router-dom";
import useFetch from './useFetch';
import { useHistory } from "react-router-dom";


const RecipeDetails = () => {
    const { id } = useParams();
    const { data: recipe, error, isPending } = useFetch('http://localhost:8000/recipes/' + id);
    const history = useHistory();


    const handleDelete = () => {
        fetch('http://localhost:8000/recipes/' + recipe.id, {
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
                    <p>Written By {recipe.author}</p>
                    <div>{recipe.body}</div>
                    <button onClick={handleDelete}>Delete</button>
                </article>
            )}
        </div>
    );
}

export default RecipeDetails;