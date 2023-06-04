import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { LoggedContext } from '../LoggedInUser';

const Create = () => {
    const { user, setUser } = useContext(LoggedContext);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const author = user.fname + ' ' + user.lname;
    const [ingredients, setIngredients] = useState([]);
    const [item, setItem] = useState('');
    const [note, setNote] = useState('');
    const [time, setTime] = useState(null);
    const [temp, setTemp] = useState();
    const author_id = user._id;
    const [isPending, setIsPending] = useState(false);
    // const [error, setError] = useState(null);
    const history = useHistory();
    const [img, setImg] = useState('');


    const hanndleSubmit = (e) => {
        e.preventDefault();
        var formdata = new FormData();
        formdata.append("title", title);
        formdata.append("body", body);
        formdata.append("author", author);
        formdata.append("ingredients", ingredients);
        formdata.append("note", note);
        formdata.append("time", time);
        formdata.append("temp", temp);
        formdata.append("author_id", author_id);
        formdata.append("img", img, img.name);
        setIsPending(true);
        fetch('https://recipe-book-server.onrender.com/api/recipes/recipes', {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        }).then(() => {
            setIsPending(false);
            fetchUser();
            history.push('/');
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


    const handleFileUpload = async (e) => {
        setImg(e.target.files[0])
    }

    const fetchUser = async () => {
        const response = await fetch('https://recipe-book-server.onrender.com/api/recipes/users/' + user._id);
        const json = await response.json();
        if (response.ok) {
            setUser({ ...user, recipes: json.recipes });
        } else {
        }
    }

    return (
        <div className="create">
            <div>
                <h2>Add New Recipe</h2>
                <form onSubmit={hanndleSubmit}>
                    <label>Recipe Title:</label>
                    <input type="text" required name="title" placeholder="Apple pie"
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

                    <label>Notes:</label>
                    <textarea name="note"
                        value={note} onChange={(e) => setNote(e.target.value)} />

                    <label>
                        Image:
                        <input type="file" name="imgfile" accept=".png,.jpg" onChange={handleFileUpload} />
                    </label>
                    <img src={img} alt={title} />

                    <label>Recipe author: {author}</label>
                    {!isPending && (ingredients.length > 0) && img && <button type="submit">Add Recipe</button>}
                    {isPending && <button disabled>Adding Recipe...</button>}

                </form>
            </div>
            <div>
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

export default Create;