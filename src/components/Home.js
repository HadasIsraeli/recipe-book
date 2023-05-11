import { useEffect, useState, useContext } from "react";
import RecipeList from "./RecipeList";
import useFetch from "./useFetch";
import { LoggedContext } from '../LoggedInUser';
import magnifier from '../assets/magnifier.png';


const Home = () => {
  const { user, setUser } = useContext(LoggedContext);
  const [recipes_res, setRecipesRes] = useState([]);
  const [Pending, setPending] = useState(true);
  const [erro, setErr] = useState(null);
  const { data: recipes, error, isPending } = useFetch('/api/recipes/recipes');
  const [search, SetSearch] = useState('');
  const [search_win, setSearchWin] = useState(null);

  const hanndleSubmit = async (e) => {
    e.preventDefault();
    setRecipesRes([]);
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
    setRecipesRes([]);
  }

  const handleOpen = () => {
    setSearchWin(true);
    console.log(search_win);
  }

  return (
    <div className="home">
      {!search_win && <button className="search-btn" onClick={() => handleOpen()}><i class="fa-solid fa-magnifying-glass"></i></button>}
      <div>
        {search_win && <form className="search" onSubmit={hanndleSubmit}>
          <button type="button" style={{ background: "#892be200", color: "#711bb3" }} onClick={() => handleClose()}><i class="fa-regular fa-circle-xmark"></i></button>
          <div>
            <input type="text" name="search" value={search} placeholder="search recipe title..." onChange={(e) => SetSearch(e.target.value)} />
            <button type="submit">Search</button>
          </div>
          {(recipes_res.length > 0) && <RecipeList recipes={recipes_res} title='Results' />}
          {/* {(recipes_res.length == 0) && <div>No results found</div>} */}
        </form>}
      </div>

      {isPending && <div><i class="fa-solid fa-spinner fa-spin-pulse"></i> Loading...</div>}
      {error && <div><i class="fa-solid fa-triangle-exclamation fa-beat"></i> {error}</div>}
      {recipes && <RecipeList recipes={recipes} title='All Recipes' />}
    </div>
  );
}

export default Home;