import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { LoggedContext } from '../LoggedInUser';

const Create = () => {
    const { user, setUser } = useContext(LoggedContext);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState(user.fname + ' ' + user.lname);
    const [ingredients, setIngredients] = useState([]);
    const [item, setItem] = useState('');
    const [note, setNote] = useState('');
    const [time, setTime] = useState(null);
    const [temp, setTemp] = useState();
const author_id=user._id;
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();
    // let authors_name = ['Hadas', 'Inbar', 'Sarah'];
    // const [authors, setAuthors] = useState([]);
    // const [image, setImage] = useState('');
    const [img, setImg] = useState('');

    // useEffect(() => {
    //     const fetchAuthorsList = async () => {
    //         const response = await fetch('/api/recipes/users');
    //         const json = await response.json();
    //         console.log(json);
    //         if (response.ok) {
    //             setIsPending(false);
    //             setAuthors(json);
    //         } else {
    //             setError(true);
    //             console.log(error);
    //         }
    //     }

    //     fetchAuthorsList();
    // }, []);

    const hanndleSubmit = (e) => {
        e.preventDefault();
        const recipe = { title, body, author, ingredients, note, time, temp, img ,author_id};
        console.log('recipe!',recipe);
        setIsPending(true);
        fetch('/api/recipes/recipes', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(recipe)
        }).then(() => {
            setIsPending(false);
            history.push('/Home');
        });
    }

    const handleAddItem = () => {
        if (item !== '') {
            setIngredients([...ingredients, item]);
            setItem('');
            console.log('added item!', ingredients);
        } else {
            alert('Sorry, the ingredient is empty!');
        }
    }

    const handleDeleteItem = (ingredient) => {
        let arr = ingredients.filter(ing => ing !== ingredient);
        setIngredients(arr);
    }


    const handleFileUpload = async (e) => {
        // setImage(e.target.files[0])
        const base64 = await ConverToBase64(e.target.files[0]);
        setImg(base64);
        console.log(base64);
    }
    // const handleAddImg = () => {
    //     console.log(img);
    //     const recipe = { title: "img test", body: "a", author: 'hadas', ingredients: ['a'], note: "a", time: 3, temp: 3, img };
    //     setIsPending(true);
    //     fetch('/uploads', {
    //         method: 'POST',
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(recipe)
    //     }).then(() => {
    //         console.log(recipe);
    //         setIsPending(false);
    //     });

    // }

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
                        <input type="file" name="imgfile" accept=".jpeg,.png,.jpg" onChange={handleFileUpload} />
                        {/* <button type="button" onClick={handleAddImg}>add img</button> */}
                    </label>
                    <img src={img} alt={title} />

                    <label>Recipe author: {author}</label>
                    {/* <select name="author"
                        value={author} onChange={(e) => setAuthor(e.target.value)}>
                        {authors.map((author) => (
                            <option value="author">{author.fname} {author.lname}</option>
                        ))}
                    </select> */}
                    {!isPending && (ingredients.length > 0) && <button type="submit">Add Recipe</button>}
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

function ConverToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        }
        fileReader.onerror = (err) => {
            reject(err);
        }
    })
}