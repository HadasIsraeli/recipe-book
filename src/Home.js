import { useEffect, useState } from "react";
import RecipeList from "./RecipeList";
import useFetch from "./useFetch";

const Home = () => {

  const { data: recipes, isPending, error } = useFetch('http://localhost:8000/recipes');

  return (
    <div className="home">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {recipes && <RecipeList recipes={recipes} title='All Recipes' />}
    </div>
  );
}

export default Home;