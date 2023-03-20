import { Link } from "react-router-dom";

const RecipeList = ({recipes,title}) => {

    return (
        <div className="recipe-list">
            <h1>{title}</h1>
            {recipes.map((recipe) => (
                <div className="recipe-preview" key={recipe.id}>
                    <Link to={`/recipes/${recipe.id}`}>
                    
                    <h2>{recipe.title}</h2>
                    <p>Written by: {recipe.author}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default RecipeList;