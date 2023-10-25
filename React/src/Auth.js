import React, { createContext, useState, useEffect, useContext } from 'react';

const Auth = createContext();

export const useAuth = () => {
    return useContext(Auth);
};


// TODO:
// We need to connect this whole thing to a database. I think we can still
// keep 95% of this, especially if we add a 'login as guest' and just pass
// guest creds as we are sort of doing now.

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('isAuthenticated') === 'true'
    );

    const [userDetails, setUserDetails] = useState({
        username: localStorage.getItem('username') || '',
        password: localStorage.getItem('password') || '',
    });

    useEffect(() => {
        localStorage.setItem('isAuthenticated', isAuthenticated);
        localStorage.setItem('username', userDetails.username);
        localStorage.setItem('password', userDetails.password);
    }, [isAuthenticated, userDetails]);

    const login = (username, password) => {
        setIsAuthenticated(true);
        setUserDetails({ username, password });
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserDetails({ username: '', password: '' });
    };

    return (
        <Auth.Provider value={{ isAuthenticated, login, logout, userDetails }}>
            {children}
        </Auth.Provider>
    );
};


// ~~~~~Credit~~~~~
//   https://stackoverflow.com/questions/65952369/best-way-to-check-if-there-is-already-a-token-in-local-storage-using-use-effect
//   https://auth0.com/blog/complete-guide-to-react-user-authentication/
//   https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
