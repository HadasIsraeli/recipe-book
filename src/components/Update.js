import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Update = () => {

    const { id } = useParams();

    const [recipe, setRecipe] = useState({
        title: '',
        body: '',
        author: '',
        ingredients: [],
        note: '',
        time: '',
        temp: '',
        img: ''
    });
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Hadas');
    const [ingredients, setIngredients] = useState([]);
    const [item, setItem] = useState('');
    const [note, setNote] = useState('');
    const [time, setTime] = useState();
    const [temp, setTemp] = useState();
    const [img, setImg] = useState('');


    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await fetch('https://recipe-book-server.onrender.com/api/recipes/recipes/' + id);
            const json = await response.json();
            if (response.ok) {
                setIsPending(false);
                setRecipe(json);
                setTitle(json.title);
                setAuthor(json.author);
                setBody(json.body);
                setIngredients(json.ingredients);
                setTime(json.time);
                setTemp(json.temp);
                setNote(json.note);
                setImg(json.img);
            } else {
                setError(true);
            }
        }

        fetchRecipe();
    }, id);


    const history = useHistory();

    const hanndleSubmit = (e) => {
        e.preventDefault();
        const updated_recipe = { title, body, author, ingredients, note, time, temp };

        setIsPending(true);
        fetch('https://recipe-book-server.onrender.com/api/recipes/recipes/' + id, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated_recipe)
        }).then(() => {
            setIsPending(false);
            history.push('/recipes/' + id);
        });
    }

    const handleAddItem = () => {
        if (item !== '') {
            setIngredients([...ingredients, item]);
            setItem('');
        } else {
            alert('Sorry, the ingredient is empty!');
        }
    }

    const handleDeleteItem = (ingredient) => {
        let arr = ingredients.filter(ing => ing !== ingredient);
        setIngredients(arr);
    }

    return (
        <div className="create">
            <div>
                <h2>update Recipe</h2>
                <form onSubmit={hanndleSubmit}>
                    <label>Recipe Title:</label>
                    <input type="text" required name="title"
                        value={title} onChange={(e) => setTitle(e.target.value)} />


                    <label>ingredients:</label>
                    <div className="ingredients-input">
                        <input type="text" name="item" placeholder="sugar"
                            value={item} onChange={(e) => setItem(e.target.value)} />
                        <button type="button" onClick={handleAddItem}>add</button>
                    </div>
                    <label>Total Time:</label>
                    <input type="number" required name="time" placeholder="30 min"
                        value={time} onChange={(e) => setTime(e.target.value)} />

                    <label>Oven Temp:</label>
                    <input type="number" name="temp" placeholder="180 C"
                        value={temp} onChange={(e) => setTemp(e.target.value)} />

                    <label>Recipe Content:</label>
                    <textarea name="content" required
                        value={body} onChange={(e) => setBody(e.target.value)} />

                    {/* <label>
                        Image:
                        <input type="file" name="imgfile" accept=".jpeg,.png,.jpg" onChange={handleFileUpload} />
                    </label> */}
                    {/* {img && <img src={img} alt={title} />} */}

                    <label>Notes:</label>
                    <textarea name="note"
                        value={note} onChange={(e) => setNote(e.target.value)} />

                    <label>Recipe author: {author}</label>

                    {!isPending && (ingredients.length > 0) && <button type="submit">Update Recipe</button>}
                    {isPending && <button disabled>Updating Recipe...</button>}

                </form>
            </div>
            <div>
                {recipe.img && <img src={recipe.img} alt={recipe.title} />}
                {(ingredients.length > 0) && <h4>Ingredients:</h4>}
                <div>{ingredients.map((ingredient) => (
                    <div className="edit-ingredients">
                        <li>{ingredient}</li>
                        <button type="button" onClick={() => handleDeleteItem(ingredient)}>delete</button>
                    </div>
                ))}</div>
            </div>
        </div>
    );
}

export default Update;