import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const token = localStorage.getItem("AUTH");
    const [ loggedIn, setLoggedIn ] = useState(token ? true : false);
    const [ profile, setProfile ] = useState([]);

    const navigate = useNavigate()

    const logOut = () => {
        localStorage.removeItem("AUTH");
        localStorage.removeItem("RE_A");
        setLoggedIn(false);
        setProfile([]);
        navigate("/login");
    }

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, profile, setProfile, logOut }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;