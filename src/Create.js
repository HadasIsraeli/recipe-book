import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Hadas');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const hanndleSubmit = (e) => {
        e.preventDefault();
        const recipe = { title, body, author };
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

    return (
        <div className="create">
            <h2>Add New Recipe</h2>
            <form onSubmit={hanndleSubmit}>
                <label>Recipe Title:</label>
                <input type="text" required name="title" placeholder="Apple pie"
                    value={title} onChange={(e) => setTitle(e.target.value)} />
                <label>Recipe Content:</label>
                <textarea name="content" required
                    value={body} onChange={(e) => setBody(e.target.value)} />
                <label>Recipe author:</label>
                <select name="author"
                    value={author} onChange={(e) => setAuthor(e.target.value)}>
                    <option value="Hadas">Hadas</option>
                    <option value="Inbar">Inbar</option>
                    <option value="Sarah">Sarah</option>
                </select>
                {!isPending && <button>Add Recipe</button>}
                {isPending && <button disabled>Adding Recipe...</button>}

            </form>
        </div>
    );
}

export default Create;