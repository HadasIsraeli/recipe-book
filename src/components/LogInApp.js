import React, { useState, useContext } from 'react';
import LoginForm from './LoginForm';
import { withRouter } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { LoggedContext } from '../LoggedInUser';
import useFetch from './useFetch';

function LogInApp() {
    let history = useHistory();

    // const [users, setUsers] = useState([]);// Puts users data in an array
    // const [isPending, setIsPending] = useState(false);
    const [err, setError] = useState(null);
    const { user, setUser } = useContext(LoggedContext);//global users, to know who is logged in all the app pages

    // const getUsers = async () => {
    //     const response = await fetch('/api/recipes/users');
    //     const json = await response.json();
    //     console.log(json);
    //     if (response.ok) {
    //         setIsPending(false);
    //         setUsers(json);
    //     } else {
    //         setError(true);
    //         console.log(error);
    //     }
    // }
    const { data: users, error, isPending } = useFetch('/api/recipes/users');

    // if (users.length < 1) {
    // getUsers();//call the getUsers method and trigger the collect data from FireStore.
    // }

    const Login = details => {
        let user_found = users.filter(user => user.email == details.email && user.password == details.password)
        console.log('user_found', user_found);
        if (user_found.length > 0) {
            setUser({
                collections: [],
                _id: user_found[0]._id,
                fname: user_found[0].fname,
                lname: user_found[0].lname,
                author: user_found[0].author,
                recipes: user_found[0].recipes,
                collection: user_found[0].collection,
                email: user_found[0].email,
                password: user_found[0].password,
                manager: user_found[0].manager,
                LoggedIn: true,

                //setting the global users details

            });
            console.log('MATCH', user);
            history.push('/Home');
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