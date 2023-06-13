import { NavLink } from "react-router-dom";

const RecipeList = ({ recipes, title }) => {

    return (
        <div className="recipe-list">
            <h1>{title}</h1>
            <div className="recipe-card">
                {recipes.map((recipe) => (
                    (recipe) && (<NavLink to={`/recipes/${recipe["_id"]}`} style={{ textDecoration: 'none' }}>
                        <div className="polaroid-card" key={recipe._id} >

                            <div className="image-container">
                                {!recipe.img && <i class="fa-solid fa-utensils" style={{ 'font-size': '30px' }}></i>}
                                {recipe.img && recipe.img.includes('https://') && <img src={recipe.img} alt={recipe.title} />}
                                {recipe.img && !recipe.img.includes('https://') && <img src={'https://recipe-book-server.onrender.com/' + recipe.img} alt={recipe.title} />}

                            </div>
                            <div className="caption-container">
                                <h2>{recipe.title}</h2>
                                <p>{recipe.author}</p>
                            </div>

                        </div>
                    </NavLink>
                    )
                ))}
            </div>
        </div>
    );
}

export default RecipeList;