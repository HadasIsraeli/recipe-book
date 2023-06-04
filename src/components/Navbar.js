import { Link } from 'react-router-dom';
import { LoggedContext } from '../LoggedInUser';
import { useHistory } from "react-router-dom";
import { useContext, useEffect } from 'react';
import profile_user from '../assets/profile_user.png'

const Navbar = () => {
    const { user, setUser } = useContext(LoggedContext);
    // let user_manager = user.manager;
    let logged_in = user.LoggedIn;
    const history = useHistory();

    useEffect(() => {
        const data = window.localStorage.getItem('user');
        setUser(JSON.parse(data));
    }, []);

  

    const Logout = () => {      //set global user details to first state and logout
        const data = {
            LoggedIn: false,
            _id: "",
            fname: "",
            lname: "",
            author: false,
            avatar: "",
            recipes: [],
            collections: [],
            manager: false
        };
        setUser(data);
        window.localStorage.setItem("user", JSON.stringify(data));
        history.push('/'); //sends the user to login page
    }

    if (user.manager && logged_in) {
        return (
            <nav className="navbar">
                <h1>The MerimIsraeli Recipe Book</h1>
                {/* <div className="h1">MANAGER page</div> */}
                <div className="links">
                    <Link to="/"><i class="fa-solid fa-house"></i></Link>
                    <Link to="/create"><i class="fa-solid fa-plus"></i></Link>
                    <Link to="/users"><i class="fa-solid fa-users"></i></Link>
                </div>
                <div className="dropdown">
                    <button>
                        <img className="profile-img" src={profile_user} alt="profile_user" title="profile_user" />
                    </button>
                    <div className="dropdown-content">
                        <div className="user">
                            <div>{user.fname} {user.lname} </div>
                            <p>{user.email} </p>
                        </div>
                        <Link to="/UserProfile"><i class="fa-solid fa-address-card"></i></Link>
                        <button className="logout-btn" onClick={Logout}>
                            <i class="fa-solid fa-right-from-bracket"></i>
                        </button>
                    </div>
                </div>
            </nav>
        );
    } else if (!user.manager && !user.author && logged_in) {
        return (
            <nav className="navbar">
                <h1>The MerimIsraeli Recipe Book</h1>
                {/* <div className="h1">USER page</div> */}
                <div className="links">
                    <Link to="/"><i class="fa-solid fa-house"></i></Link>
                </div>
                <div className="dropdown">
                    <button>
                        <img className="profile-img" src={profile_user} alt="profile_user" title="profile_user" />
                    </button>
                    <div className="dropdown-content">
                        <div className="user">
                            <div>{user.fname} {user.lname} </div>
                            <p>{user.email} </p>
                        </div>
                        <Link to="/UserProfile"><i class="fa-solid fa-address-card"></i></Link>
                        <button className="logout-btn" onClick={Logout}>
                            <i class="fa-solid fa-right-from-bracket"></i>
                        </button>
                    </div>
                </div>
                {/* <button onClick={Logout}>
                    Logout
                </button> */}
            </nav>
        );
    } else if (!user.manager && user.author && logged_in) {
        return (
            <nav className="navbar">
                <h1>The MerimIsraeli Recipe Book</h1>
                {/* <div className="h1">USER author page</div> */}
                <div className="links">
                    <Link to="/"><i class="fa-solid fa-house"></i></Link>
                    <Link to="/create"><i class="fa-solid fa-plus"></i></Link>
                </div>
                <div className="dropdown">
                    <button>
                        <img className="profile-img" src={profile_user} alt="profile_user" title="profile_user" />
                    </button>
                    <div className="dropdown-content">
                        <div className="user">
                            <div>{user.fname} {user.lname} </div>
                            <p>{user.email} </p>
                        </div>
                        <Link to="/UserProfile"><i class="fa-solid fa-address-card"></i></Link>
                        <button className="logout-btn" onClick={Logout}>
                            <i class="fa-solid fa-right-from-bracket"></i>
                        </button>
                    </div>
                </div>
                {/* <button onClick={Logout}>
                    Logout
                </button> */}
            </nav>
        );
    } else {
        return (
            <nav className="navbar">
                <h1>The MerimIsraeli Recipe Book</h1>
                <div className="links">
                    <Link to="/"><i class="fa-solid fa-house"></i></Link>
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