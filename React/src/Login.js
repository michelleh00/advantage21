import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import "./App.css";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogin = () => {
    setError("");

    if (!error) {
      login(username, password);
      navigate("/account");
    }
  };

  return (
    <div>
      <nav className="login-nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/calculator">Play Calculator</Link>
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
      <div className="login-container">
        <h2>Login</h2>
        <div className="form-field">
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Password</label>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
        <div>{error && <p className="error">{error}</p>}</div>
        <div>
          Don't have an account? <Link to="/register">Sign up here!</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
