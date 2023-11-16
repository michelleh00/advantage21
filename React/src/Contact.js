import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./Auth";
import "./Contact.css";
import { useSettings } from "./Settings";

function Contact() {
    const { settings } = useSettings();
    console.log("Contact - Current settings:", settings);
    const { isAuthenticated, logout } = useAuth();
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/calculator">Play Calculator</Link>
                    </li>
                    <li>
                        <Link to="/play">Simulator</Link>
                    </li>
                    <li>
                        <Link to="/rules">Rules</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    {isAuthenticated ? (
                        <>
                            <li>
                                <Link to="/account">Account</Link>
                            </li>
                            <li onClick={logout}>Logout</li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>

            <h1>Contact</h1>
            <div className="contact-sections">
                <div className="contact-section">
                    <h2>Commercial Interests:</h2>
                    <div>
                        <p>
                            Phone: 1-800-564-9885
                            <br />
                            M-Sun 8am - 4pm EST
                        </p>
                        <p>Email: Marketing@Advantage21.com</p>
                    </div>
                </div>
                <div className="contact-section">
                    <h2>All Other Questions:</h2>
                    <div>
                        <p>
                            Phone: 1-704-248-9114
                            <br />
                            M-Sun 8am - 4pm EST
                        </p>
                        <p>Email: Help@Advantage21.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
