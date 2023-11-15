import React, { createContext, useState, useEffect, useContext } from "react";

const Auth = createContext();

export const useAuth = () => {
    return useContext(Auth);
};

// TODO:
// We need to connect this whole thing to a database. I think we can still
// keep 95% of this, especially if we add a 'login as guest' and just pass
// guest creds as we are sort of doing now.

export const AuthProvider = ({ children }) => {
    // This sets the isAuthenticated state, so we can have a 'local' account
    // logged in that we can track.
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem("isAuthenticated") === "true"
    );

    // What we are tracking with the user, in this case we are tracking username and password.
    const [userDetails, setUserDetails] = useState({
        username: localStorage.getItem("username") || "",
        password: localStorage.getItem("password") || "",
    });

    // whenever a state changes with the user this acts as a hook to update our localstorage
    useEffect(() => {
        localStorage.setItem("isAuthenticated", isAuthenticated);
        localStorage.setItem("username", userDetails.username);
        localStorage.setItem("password", userDetails.password);
    }, [isAuthenticated, userDetails]);

    // Passes a username and password and sets the status as 'logged in'
    const login = async (username, password) => {
        setIsAuthenticated(true);
        setUserDetails({ username, password });

        // try {
        //     // Call your backend API to authenticate the user
        //     const response = await fetch("/api/login", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({ username, password }),
        //     });

        //     if (response.ok) {
        //         setIsAuthenticated(true);
        //         setUserDetails({ username, password });
        //     } else {
        //         // Handle authentication failure
        //         console.error("Authentication failed");
        //     }
        // } catch (error) {
        //     console.error("Error during authentication:", error);
        // }
    };

    // Clears the temporary username and password and then sets the logged in status to false.
    const logout = () => {
        setIsAuthenticated(false);
        setUserDetails({ username: "", password: "" });
    };

    const register = async (username, email, password) => {
        try {
            // Mock registration logic
            console.log("User registered:", username, email, password);
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    // Sends to the provider, which updates the state in all other applicaple locations.
    return (
        <Auth.Provider value={{ isAuthenticated, login, logout, userDetails, register }}>
            {children}
        </Auth.Provider>
    );
};

// ~~~~~Credit~~~~~
//   https://stackoverflow.com/questions/65952369/best-way-to-check-if-there-is-already-a-token-in-local-storage-using-use-effect
//   https://auth0.com/blog/complete-guide-to-react-user-authentication/
//   https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
