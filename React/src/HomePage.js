import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './Auth';

function HomePage() {
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

      <h1>Advantage 21!</h1>
      <h2>Lets make this link to optimal play/trainer</h2>
    </div>
  );
}

export default HomePage;
