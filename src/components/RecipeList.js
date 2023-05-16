import { NavLink } from "react-router-dom";

const RecipeList = ({ recipes, title }) => {

    return (
        <div className="recipe-list">
            <h1>{title}</h1>
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
                                <p>{recipe.author}</p>
                            </div>

                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

export default RecipeList;