import { Link } from 'react-router-dom';
import { LoggedContext } from '../LoggedInUser';
import { useHistory } from "react-router-dom";
import { useContext } from 'react';
import profile_user from '../assets/profile_user.png'

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
                    <Link to="/">Home</Link>
                    <Link to="/create">New Recipe</Link>
                    <Link to="/users">Users</Link>
                </div>
                <div className="dropdown">
                    <button>
                        <img className="profile-img" src={profile_user} alt="profile_user" title="profile_user" />
                    </button>
                    <div className="dropdown-content">
                    <Link to="/UserProfile">Profile</Link>

                        <button className="logout-btn"onClick={Logout}>
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
        );
    } else if (!user.manager && !user.author && logged_in) {
        return (
            <nav className="navbar">
                <h1>The MerimIsraeli Recipe Book</h1>
                <div className="h1">USER page</div>
                <div className="links">
                    <Link to="/">Home</Link>
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
                    <Link to="/">Home</Link>
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
                    <Link to="/">Home</Link>
                    <div className="dropdown">
                        <button>
                            <img className="profile-img" src={profile_user} alt="profile_user" title="profile_user" />
                        </button>
                        <div className="dropdown-content">
                            <Link to="/Register">Register</Link>
                            <Link to="/Login">Login</Link>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;