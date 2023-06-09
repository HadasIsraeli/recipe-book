// import useFetch from './useFetch';
import { NavLink } from "react-router-dom";
import { useEffect, useState,useContext } from "react";
import { LoggedContext } from '../LoggedInUser';


const UsersPage = () => {
    const { user, setUser } = useContext(LoggedContext);
    const [users, setUsers] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        setIsPending(true);
        const fetchAuthorsList = async () => {
            const response = await fetch('https://recipe-book-server.onrender.com/api/recipes/users');
            const json = await response.json();
            if (response.ok) {
                setIsPending(false);
                setUsers(json);
            } else {
                setError(true);
            }
        }

        fetchAuthorsList();
    }, []);

    return (<div className="recipe-list">
        <h1>Users</h1>
        <div className="recipe-card">
            {isPending && <div><i class="fa-solid fa-spinner fa-spin-pulse"></i> Loading...</div>}
            {error && <div>Error...</div>}
            {users.map((user) => (
                <NavLink to={`/user/${user._id}`} style={{ textDecoration: 'none' }}>
                    <div className="polaroid-card" key={user._id} >
                        <div className="image-container">
                            {/* {!user.img && <img src="https://handletheheat.com/wp-content/uploads/2015/03/Best-Birthday-Cake-with-milk-chocolate-buttercream-SQUARE.jpg"
                            alt="your-image-description" />}
                        {user.img && <img src={user.img} alt={user.title} />} */}
                            <div>
                                <i class={user.avatar} style={{"font-size": "55px"}}></i>
                            </div>
                        </div>
                        <div className="caption-container">
                            <h2>{user.fname} {user.lname}</h2>
                            {/* <div>
                                <i class={user.avatar}></i>
                            </div> */}
                            <div classnAME="user-data">
                                <p>{user.email}</p>
                                {/* <p>recipes: {user.recipes.length}</p>
                                <p>collections: {user.collections.length}</p>
                                {user.author && <p>author</p>}
                                {user.manager && <p>manager</p>} */}
                            </div>
                        </div>

                    </div>
                </NavLink>
            ))}
        </div>
    </div>);
}

export default UsersPage;