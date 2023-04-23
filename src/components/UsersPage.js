// import useFetch from './useFetch';
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const UsersPage = () => {
    // const { data: users, error, isPending } = useFetch('/api/recipes/users');

    const [users, setUsers] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchAuthorsList = async () => {
            const response = await fetch('/api/recipes/users');
            const json = await response.json();
            console.log(json);
            if (response.ok) {
                setIsPending(false);
                setUsers(json);
            } else {
                setError(true);
                console.log(error);
            }
        }

        fetchAuthorsList();
    }, []);
    console.log(users);

    return (<div className="recipe-list">
        <h1>Users</h1>
        <div className="recipe-card">
            {users.map((user) => (
                <NavLink to={`/user/${user._id}`} style={{ textDecoration: 'none' }}>
                    <div className="polaroid-card" key={user._id} >
                        {/* <div className="image-container">
                        {!user.img && <img src="https://handletheheat.com/wp-content/uploads/2015/03/Best-Birthday-Cake-with-milk-chocolate-buttercream-SQUARE.jpg"
                            alt="your-image-description" />}
                        {user.img && <img src={user.img} alt={user.title} />}
                    </div> */}
                        <div className="caption-container">
                            <h2>{user.fname} {user.lname}</h2>
                            <p>{user.email}</p>
                            <p>recipes: {user.recipes.length}</p>
                            <p>collections: {user.collections.length}</p>
                            {user.author && <p>author</p>}
                            {user.manager && <p>manager</p>}
                        </div>

                    </div>
                </NavLink>
            ))}
        </div>
    </div>);
}

export default UsersPage;