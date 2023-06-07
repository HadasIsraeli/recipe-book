import { useState } from "react";
import RecipeList from "./RecipeList";
import useFetch from "./useFetch";


const Home = () => {
  const [recipes_res, setRecipesRes] = useState([]);
  const [Pending, setPending] = useState(false);
  const [erro, setErr] = useState(null);
  const { data: recipes, error, isPending } = useFetch('https://recipe-book-server.onrender.com/api/recipes/recipes');
  const [search, SetSearch] = useState('');
  const [search_win, setSearchWin] = useState(null);

  const hanndleSubmit = async (e) => {
    e.preventDefault();
    setRecipesRes([]);
    if (search.length > 0) {
      setPending(true);
      setErr(false);
      const response = await fetch('https://recipe-book-server.onrender.com/api/recipes/searchrecipes/' + search);
      const json = await response.json();
      if (response.ok) {
        setPending(false);
        if (json.length > 0) {
          setRecipesRes(json);
        } else {
          setErr(true);
        }
      } else {
        setPending(false);
        setErr(true);
      }
    }
  }

  const handleClose = () => {
    SetSearch('');
    setSearchWin(false);
    setRecipesRes([]);
  }

  const handleOpen = () => {
    setSearchWin(true);
  }

  return (
    <div className="home">
      {isPending && <div><i class="fa-solid fa-spinner fa-spin-pulse"></i> Loading...</div>}
      {error && <div><i class="fa-solid fa-triangle-exclamation fa-beat"></i> {error}</div>}

      <div>
        {!search_win && <button className="search-btn" onClick={() => handleOpen()}><i class="fa-solid fa-magnifying-glass"></i></button>}
        {recipes && <RecipeList recipes={recipes} title='All Recipes' />}
      </div>

      <div>
        {search_win && <form className="search" onSubmit={hanndleSubmit} >
          <button type="button" style={{ background: "#892be200", color: "black" }} onClick={() => handleClose()}><i class="fa-regular fa-circle-xmark"></i></button>
          <div>
            <input type="text" name="search" value={search} placeholder="search recipe..."
              onKeyUp={hanndleSubmit}
              onChange={(e) => SetSearch(e.target.value)}
            />
            <button type="submit">Search</button>
          </div>
          {(recipes_res.length > 0) && <RecipeList recipes={recipes_res} title='Results' />}
          {Pending && <div><i class="fa-solid fa-spinner fa-spin-pulse"></i> Searchig...</div>}
          {erro && <div><i class="fa-solid fa-triangle-exclamation fa-beat"></i> No results found</div>}

        </form>}
      </div>

    </div>
  );
}

export default Home;