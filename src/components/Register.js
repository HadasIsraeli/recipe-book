import React, { useState, useContext } from 'react';
import { LoggedContext } from '../LoggedInUser';
import AddUser from './AddUser';
import { useHistory } from 'react-router-dom';
import validator from 'validator';
import useFetch from './useFetch';

function Register() {
    let history = useHistory();
    let user_match = false;
    const { user, setUser } = useContext(LoggedContext);

    const [IsPending, setIsPending] = useState(false);
    // const [users_list, setList] = useState([]);// Puts users data in an array
    const [err, setError] = useState(null);

    // const getUsers = async () => {          // Collects the data from FireStore and triggers  SetUsers.
    //     const response = await fetch('/api/recipes/users');
    //     const json = await response.json();
    //     console.log(json);
    //     if (response.ok) {
    //         setIsPending(false);
    //         setList(json);
    //     } else {
    //         setError(true);
    //         console.log(error);
    //     }
    // }
    const { data: users_list, error, isPending } = useFetch('/api/recipes/users');
    // if (users_list.length < 1) {
    //     getUsers();//call the getUsers method and trigger the collect data from FireStore.
    // }


    const addUser = (new_user) => {
        setError('');
        //check if inputs are valid
        if (!validator.isAlpha(new_user.lname)) { //validate name input to alphabetic characters only
            setError('Invalid Name! Please input letters only');
        }
        else if (!validator.isAlpha(new_user.fname)) { //validate name input to alphabetic characters only
            setError('Invalid Name! Please input letters only');
        }
        else if (!validator.isEmail(new_user.email)) {  //validate mail input to proper mail form
            setError('Sorry! try somthing like "foo@bar.com"...');
        }
        else if (!validator.isStrongPassword(new_user.password, { //validate password input to have the conditions
            minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1    //conditions to valid password
        })) {
            setError('Invalid password! minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1');
        } else {
            //check if there is no userName as such
            let user_found = users_list.filter(user => user.email == new_user.email)
            console.log('user_found', user_found);
            if (user_found.length > 0) {
                user_match = true;
                setError('Sorry! There is alraedy an email ' + new_user.userName + ' in the system! try somthing else...');
            }
            // users_list.map((user, index) => {
            //     if (new_user.email === user.email) {
            //         user_match = true;
            //         setError('Sorry! There is alraedy an email ' + new_user.userName + ' in the system! try somthing else...');
            //     }
            else {
                // if ((index === users_list.length - 1) && (user_match === false)) { //creating a new user if validating passed and the is no maching userName
                new_user.LoggedIn = true;

                const user = {
                    lname: new_user.lname,
                    fname: new_user.fname,
                    password: new_user.password,
                    email: new_user.email,
                    manager: false,
                    author: false,
                    recipes: [],
                    collections: [],
                };
                setIsPending(true);
                fetch('/api/recipes/users', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(user)
                }).then(() => {
                    setIsPending(false);
                    setUser(new_user);
                    history.push('/Home');
                });

                history.push('/Home'); //sending the new user to the main page
            }
            //     }
            // });
        }
    }


    return (
        <div className="App">
            <h1 className="headline">Hello New Friend!</h1>
            <AddUser addUser={addUser} error={error} />
        </div>
    );
}

export default Register;