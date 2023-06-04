import React, { useState, useContext } from 'react';
import LoginForm from './LoginForm';
import { withRouter } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { LoggedContext } from '../LoggedInUser';
import useFetch from './useFetch';

function LogInApp() {
    let history = useHistory();
    const [err, setError] = useState(null);
    const { user, setUser } = useContext(LoggedContext);//global users, to know who is logged in all the app pages

 
    const { data: users, error, isPending } = useFetch('https://recipe-book-server.onrender.com/api/recipes/users');

   

    const Login = details => {
        let user_found = users.filter(user => user.email === details.email && user.password === details.password)
        if (user_found.length > 0) {
            const data = {
                _id: user_found[0]._id,
                fname: user_found[0].fname,
                lname: user_found[0].lname,
                author: user_found[0].author,
                recipes: user_found[0].recipes,
                collections: user_found[0].collections,
                email: user_found[0].email,
                manager: user_found[0].manager,
                LoggedIn: true,
                avatar: user_found[0].avatar
            }
            setUser(data);
            window.localStorage.setItem("user", JSON.stringify(data));
            history.push('/');
        }

        else {
            setError('Details do not match! Please Check your spelling or Register :) ');
        }
    }

    return (
        <div className="App">
            <h1 className="headline">Welcome Back!</h1>
            <LoginForm Login={Login} error={error} />
            {err && <h2>{err}</h2>}
        </div>
    );
}

export default withRouter(LogInApp);