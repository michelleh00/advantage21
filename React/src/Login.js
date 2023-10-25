import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';
import './App.css';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login(username, password);
    navigate('/');

  };

  return (
    <div>
        <nav className="login-nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/calculator">Play Calculator</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
      <h2>Login</h2>
      <div class = 'login-container'>
        <label>Username</label>
        <input 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-btn" onClick={handleLogin}>Login</button>
        Don't have an account? <Link to="/register">Sign up here!</Link>
      </div>

    </div>
  );
}

export default Login;
