import { createContext, useState } from "react";

export const LoggedContext = createContext();

export const LoggedContextWrapper = ({ children }) => {

    const [user, setUser] = useState({
        _id: "",
        fname: "",
        lname: "",
        author: false,
        recipes: [],
        collections: [],
        email: "",
        password: "",
        manager: false,
        LoggedIn:false
    });

    return (
        <LoggedContext.Provider value={{ user, setUser }}>
            {children}
        </LoggedContext.Provider>
    );
};
// {
//     "_id": "642529d164bcd97dbf8f5a8a",
//     "fname": "Hadas",
//     "lname": "Israeli",
//     "author": true,
//     "recipes": [],
//     "collection": [],
//     "email": "hadas25496@gmail.com",
//     "password": "123456",
//     "manager": true
// }