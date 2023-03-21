import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Hadas');
    const [ingredients, setIngredients] = useState([]);
    const [item, setItem] = useState('');
    const [note, setNote] = useState('');
    const [time, setTime] = useState(null);
    const [temp, setTemp] = useState();

    const [isPending, setIsPending] = useState(false);
    const history = useHistory();
    let authors_name = ['Hadas', 'Inbar', 'Sarah'];

    const hanndleSubmit = (e) => {
        e.preventDefault();

        const recipe = { title, body, author, ingredients, note, time, temp };
        setIsPending(true);
        fetch('http://localhost:8000/recipes', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(recipe)
        }).then(() => {
            setIsPending(false);
            history.push('/');
        });
    }

    const handleAddItem = () => {
        setIngredients([...ingredients, item]);
        setItem('');
        console.log('added item!', ingredients);
    }

    return (
        <div className="create">
            <h2>Add New Recipe</h2>
            <form onSubmit={hanndleSubmit}>
                <label>Recipe Title:</label>
                <input type="text" required name="title" placeholder="Apple pie"
                    value={title} onChange={(e) => setTitle(e.target.value)} />


                <label>ingredients:</label>
                <input type="text" name="item" placeholder="sugar"
                    value={item} onChange={(e) => setItem(e.target.value)} />
                <button type="button" onClick={handleAddItem}>add ingredient</button>
                {ingredients.map((ingredient) => (
                    <p>{ingredient}</p>
                ))}

                <label>Total Time:</label>
                <input type="number" required name="time" placeholder="30 min"
                    value={time} onChange={(e) => setTime(e.target.value)} />

                <label>Oven Temp:</label>
                <input type="number" name="temp" placeholder="180 C"
                    value={temp} onChange={(e) => setTemp(e.target.value)} />

                <label>Recipe Content:</label>
                <textarea name="content" required
                    value={body} onChange={(e) => setBody(e.target.value)} />

                <label>Notes:</label>
                <textarea name="note"
                    value={note} onChange={(e) => setNote(e.target.value)} />

                <label>Recipe author:</label>
                <select name="author"
                    value={author} onChange={(e) => setAuthor(e.target.value)}>
                    {authors_name.map((author) => (
                        <option value="author">{author}</option>
                    ))}
                </select>
                {!isPending && (ingredients.length > 0) && <button type="submit">Add Recipe</button>}
                {isPending && <button disabled>Adding Recipe...</button>}

            </form>
        </div>
    );
}

export default Create;