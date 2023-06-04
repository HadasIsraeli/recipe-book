import React, { useState } from 'react';
// import { Button } from 'react-bootstrap';

function LoginForm({ Login, error }) {
    const [details, setDetails] = useState({        //variable to save the login input details
        name: "",
        _id: "",
        email: "",
        manager: "",
        LoggedIn: false
    });

    const submitHandler = e => {//send the login input details to LoginApp component when submit
        e.preventDefault();
        Login(details);
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="create">
                <h2 className="form-title">Login</h2>
                {(error !== "") ? (
                    <div className="error">{error}</div>) : ""}
                <div className="form-group">
                    <lable htmlFor="name">email:</lable>
                    <input type="text" name="email" id="email" required onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} />
                </div>
                <div className="form-group">
                    <lable htmlFor="password">Password:</lable>
                    <input type="password" name="password" id="password" required onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                </div>
                <button type="submit">Login</button>

            </div>
        </form>
    )
}

export default LoginForm;