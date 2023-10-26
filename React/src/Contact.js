import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './Auth';

function Contact() {
  const { isAuthenticated, logout } = useAuth();
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
                        <li><Link to="/register">Register</Link></li></>
                    )}
        </ul>
      </nav>

      <h1>Contact</h1>
      <h2>contact us!</h2>
    </div>
  );
}

export default Contact;
