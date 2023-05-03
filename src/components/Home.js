import { useEffect, useState, useContext } from "react";
import RecipeList from "./RecipeList";
import useFetch from "./useFetch";
import { LoggedContext } from '../LoggedInUser';


const Home = () => {
  const { user, setUser } = useContext(LoggedContext);
  const [recipes_res, setRecipesRes] = useState(null);
  const [Pending, setPending] = useState(true);
  const [erro, setErr] = useState(null);
  const { data: recipes, error, isPending } = useFetch('/api/recipes/recipes');
  const [search, SetSearch] = useState('');
  const [search_win, setSearchWin] = useState(null);

  const hanndleSubmit = async (e) => {
    e.preventDefault();
    setRecipesRes(null);
    setPending(true);
    console.log(search)
    const response = await fetch('/api/recipes/searchrecipes/' + search);
    const json = await response.json();
    console.log("recipes results", json);
    if (response.ok) {
      setPending(false);
      setRecipesRes(json);
    } else {
      setErr(true);
      console.log(error);
    }
  }

  const handleClose = () => {
    SetSearch('');
    setSearchWin(false);
    setRecipesRes(null);
  }

  const handleOpen = () => {
    setSearchWin(true);
    console.log(search_win);
  }

  return (
    <div className="home">
      <div >
        {!search_win && <button onClick={() => handleOpen()}>search for recipes</button>}
        {search_win && <form className="search" onSubmit={hanndleSubmit}>
          <button type="button" onClick={() => handleClose()}>X</button>
          <div>
            <input type="text" name="search" value={search} onChange={(e) => SetSearch(e.target.value)} />
            <button type="submit">Search</button>
          </div>
          {recipes_res && <RecipeList recipes={recipes_res} title='Results' />}
        </form>}
      </div>
      <div className="user">
        <h2>{user.fname} {user.lname} </h2>
        <div>{user.email} </div>
      </div>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {recipes && <RecipeList recipes={recipes} title='All Recipes' />}
    </div>
  );
}

export default Home;