import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // using this as a placeholder for when we link to our database.
  const handleLogin = () => {
    console.log("Username:", username, "Password:", password);
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Username: </label>
        <input 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password: </label>
        <input
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>

      <div>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default Login;
