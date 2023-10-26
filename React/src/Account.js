import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './Auth';
import Switch from "./Switch";
import "./Account.css";

function Account() {
    const { isAuthenticated, logout } = useAuth();
    const { userDetails } = useAuth();

    const [darkMode, setDarkMode] = useState(false);
    const [soft17, setSoft17] = useState(false);
    const [surrender, setSurrender] = useState(false);
    const [handTimer, setHandTimer] = useState(false);

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
                            <li onClick={logout}>Logout</li></>)
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
                    <p>Dark Mode:</p>
                    <p>Hit on Soft 17:</p>
                    <p>Allow Surrender:</p>
                </div>
                <div className="left-toggles">
                    <Switch id="darkMode" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                    <Switch id="soft17" checked={soft17} onChange={() => setSoft17(!soft17)} />
                    <Switch id="surrender" checked={surrender} onChange={() => setSurrender(!surrender)} />
                </div>
                <div className="percentages">
                    <p>Session Percentage Correct:</p>
                    <p>Overall Percentage Correct:</p>
                </div>
                <div className="right-options">
                    <p>Hand Timer:</p>
                </div>
                <div className="right-toggles">
                    <Switch id="handTimer" checked={handTimer} onChange={() => setHandTimer(!handTimer)} />
                </div>
                <div className="streaks">
                    <p>Best Session Streak:</p>
                    <p>Longest Streak:</p>
                </div>
            </div>
        </div>
    );
}

export default Account;






