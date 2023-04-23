import React, { useState } from 'react';

function AddUser({ addUser, error }) {

    const [state, setState] = useState({        //variable to save the registration input details
        
        _id: "",
        fname: "",
        lname: "",
        author: false,
        recipes: [],
        collections: [],
        email: "",
        password: "",
        manager: false,
        LoggedIn: null,
    });

    const handleSubmit = (e) => {//send the registration input details to Register component when submit
        e.preventDefault();

        addUser(state);
    }


    return (
        <form onSubmit={handleSubmit} className="form-register">
            <div className="create">
                <h2 className="form-title">Register:</h2>
                {(error !== "") ? (
                    <p className="error">{error}</p>) : ""}
                <div class="form-group-inputs">
                    <div className="inner-group">
                        <div className="form-group">
                            <label htmlFor="name">First Name:</label>
                            <input type="text" name="fname" id="fname" required onChange={e => setState({ ...state, fname: e.target.value })} value={state.fname} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Last Name:</label>
                            <input type="text" name="lname" id="lname" required onChange={e => setState({ ...state, lname: e.target.value })} value={state.lname} />
                        </div>
                    </div>
                    <div className="inner-group">
                        {/* <div className="form-group">
                            <label htmlFor="gender">Gender:</label>
                            <input type="text" name="gender" id="gender" required onChange={e => setState({ ...state, gender: e.target.value })} value={state.gender} />
                        </div> */}
                        <div className="form-group">
                            <label htmlFor="mail">E-Mail:</label>
                            <input type="mail" name="email" id="email" required onChange={e => setState({ ...state, email: e.target.value })} value={state.email} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" name="password" id="password" required onChange={e => setState({ ...state, password: e.target.value })} value={state.password} />
                        <p>minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1</p>
                        </div>
                    </div>
                </div>
                <button className="submit-button" type="submit" value="SIGNIN">Submit</button>

            </div>
        </form >
    )
}

export default AddUser;