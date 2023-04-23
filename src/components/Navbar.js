import { Link } from 'react-router-dom';
import { LoggedContext } from '../LoggedInUser';
import { useHistory } from "react-router-dom";
import { useContext } from 'react';

const Navbar = () => {
    const { user, setUser } = useContext(LoggedContext);
    // let user_manager = user.manager;
    let logged_in = user.LoggedIn;
    console.log('NAVBAR', user, user.manager, logged_in);
    const history = useHistory();

    const Logout = () => {      //set global user details to first state and logout
        setUser({
            LoggedIn: false,
            _id: "",
            fname: "",
            lname: "",
            author: false,
            recipes: [],
            collections: [],
            manager: false
        });
        history.push('/'); //sends the user to login page
    }

    if (user.manager && logged_in) {
        return (
            <nav className="navbar">
                <h1>The MerimIsraeli Recipe Book</h1>
                <div className="h1">MANAGER page</div>
                <div className="links">
                    <Link to="/Home">Home</Link>
                    <Link to="/create">New Recipe</Link>
                    <Link to="/users">Users</Link>
                </div>
                <button onClick={Logout}>
                    Logout
                </button>
            </nav>
        );
    } else if (!user.manager && !user.author && logged_in) {
        return (
            <nav className="navbar">
                <h1>The MerimIsraeli Recipe Book</h1>
                <div className="h1">USER page</div>
                <div className="links">
                    <Link to="/Home">Home</Link>
                </div>
                <button onClick={Logout}>
                    Logout
                </button>
            </nav>
        );
    } else if (!user.manager && user.author && logged_in) {
        return (
            <nav className="navbar">
                <h1>The MerimIsraeli Recipe Book</h1>
                <div className="h1">USER author page</div>
                <div className="links">
                    <Link to="/Home">Home</Link>
                    <Link to="/create">New Recipe</Link>
                </div>
                <button onClick={Logout}>
                    Logout
                </button>
            </nav>
        );
    } else {
        return (
            <nav className="navbar">
                <h1>The MerimIsraeli Recipe Book</h1>
                <div className="links">
                    <Link to="/Register">Register</Link>
                    <Link to="/">Login</Link>
                </div>
            </nav>
        );
    }
}

export default Navbar;