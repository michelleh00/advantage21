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
      <div>
        <label>Username</label>
        <input 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      <div>
        Don't have an account? <Link to="/register">Sign up here!</Link>
      </div>
    </div>
  );
}

export default Login;
