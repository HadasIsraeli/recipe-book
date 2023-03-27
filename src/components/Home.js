import { useEffect, useState } from "react";
import RecipeList from "./RecipeList";
import useFetch from "./useFetch";

const Home = () => {
  const [recipes, setRecipes] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeList = async () => {
      const response = await fetch('/api/recipes');
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        setIsPending(false);
        setRecipes(json);
      } else {
        setError(true);
      }
    }

    fetchRecipeList();
  }, []);


  // const { data: recipes, isPending, error } = useFetch('http://localhost:8000/recipes');

  return (
    <div className="home">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {recipes && <RecipeList recipes={recipes} title='All Recipes' />}
    </div>
  );
}

export default Home;