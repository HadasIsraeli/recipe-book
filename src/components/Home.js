import { useEffect, useState, useContext } from "react";
import RecipeList from "./RecipeList";
import useFetch from "./useFetch";
import { LoggedContext } from '../LoggedInUser';


const Home = () => {
  // const [recipes, setRecipes] = useState(null);
  // const [isPending, setIsPending] = useState(true);
  // const [error, setError] = useState(null);
  const { user, setUser } = useContext(LoggedContext);
  let user_type = user.type;
  
  const { data: recipes, error, isPending } = useFetch('/api/recipes/recipes');
  // useEffect(() => {
    
  //   const fetchRecipeList = async () => {
  //     const response = await fetch('/api/recipes/recipes');
  //     const json = await response.json();
  //     console.log(json);
  //     if (response.ok) {
  //       setIsPending(false);
  //       setRecipes(json);
  //       console.log('User Logged In',user);
  //     } else {
  //       setError(true);
  //     }
  //   }

  //   fetchRecipeList();
  // }, []);


  // const { data: recipes, isPending, error } = useFetch('http://localhost:8000/recipes');

  return (
    <div className="home">
      <div className="user">
        <h2>{user.fname} {user.lname} </h2>
        <div>{user.email} </div>
        {/* <div>{user._id}</div> */}
      </div>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {recipes && <RecipeList recipes={recipes} title='All Recipes' />}
    </div>
  );
}

export default Home;