import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';
import Switch from "./Switch";
import "./Account.css";

// The user's profile is displayed here. We check first if user is logged in
// and display the appropriate nav options accordingly.
// Switches are used to apply app variations.

function Account() {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();
    const { userDetails } = useAuth();

    const [darkMode, setDarkMode] = useState(false);
    const [soft17, setSoft17] = useState(false);
    const [surrender, setSurrender] = useState(false);
    const [handTimer, setHandTimer] = useState(false);

    const handleLogout = () => {
        logout();
        // Redirect to the login page after logout
        navigate('/login');
    };
    
    // Apply appropriate css depending on whether or not dark mode toggle is engaged
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);


    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/calculator">Play Calculator</Link></li>
                    <li><Link to="/play">Simulator</Link></li>
                    <li><Link to="/rules">Rules</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    {isAuthenticated ? (
                        <><li><Link to="/account">Account</Link></li>
                            <li onClick={handleLogout}>Logout</li></>)
                        :
                        (<><li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li></>)
                    }
                </ul>
            </nav>
            <h1>Welcome, {userDetails.username}!</h1>


            <div className="acct-image">
                <img src="/resources/profile.png" alt="profile icon" />
            </div>


            <div className={`acct-container ${darkMode ? 'dark-mode' : ''}`}>
                <div className="left-options">
                    Dark Mode:
                    <br></br>
                    Hit on Soft 17:
                    <br></br>
                    Allow Surrender:
                </div>
                <div className="left-toggles">
                    <Switch id="darkMode" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                    <Switch id="soft17" checked={soft17} onChange={() => setSoft17(!soft17)} />
                    <Switch id="surrender" checked={surrender} onChange={() => setSurrender(!surrender)} />
                </div>
                <div className="percentages">
                    Session Percentage Correct:
                    <br></br>
                    Overall Percentage Correct:
                </div>
                <div className="right-options">
                    Hand Timer:
                </div>
                <div className="right-toggles">
                    <Switch id="handTimer" checked={handTimer} onChange={() => setHandTimer(!handTimer)} />
                </div>
                <div className="streaks">
                    Best Session Streak:
                    <br></br>
                    Longest Streak:
                </div>
            </div>
        </div>
    );
}


export default Account;
