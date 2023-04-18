
import { useParams } from "react-router-dom";
import useFetch from './useFetch';
import { useHistory } from "react-router-dom";

const UserDetails = () => {
    const { id } = useParams();
    const { data: user, error, isPending } = useFetch('/api/recipes/users/' + id);
    const history = useHistory();

    console.log(user);
    return (
        <div className="recipe-details">
            {isPending && <div>Loading...</div>}
            {error && <div>Error...</div>}
            {user && (
                <div>
                    <h2>{user.fname} {user.lname}</h2>
                    <p>{user.email}</p>
                    <p>recipes: {user.recipes.length}</p>
                    <p>collection: {user.collections.length}</p>
                    {user.author && <p>author</p>}
                    {user.manager && <p>manager</p>}
                </div>
            )}
        </div>
    );
}

export default UserDetails;