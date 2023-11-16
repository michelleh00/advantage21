import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './Auth';
import './HomePage.css';
import './App.css';

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
            <>
              <li><Link to="/account">Account</Link></li>
              <li onClick={logout}>Logout</li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
      
      <h1 className="advantage-heading">Advantage 21</h1>

      <div className="button-container">
        <Link to="/calculator" className="button playButton">Calculator</Link>
        <Link to="/play" className="button playButton">Simulator</Link>
      </div>
    </div>
  );
}

export default HomePage;