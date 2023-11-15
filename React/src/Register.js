import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import "./App.css";
import "./Register.css";

const MIN_USERNAME_LENGTH = 6;
const MAX_USERNAME_LENGTH = 20;
const MIN_PASSWORD_LENGTH = 8;

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = () => {
    setError("");

    if (!password || !confirmPassword) {
      setError("Please enter a password and confirm your password.");
    } else {
      if (username.length < MIN_USERNAME_LENGTH) {
        setError("Username must have at least 6 characters.");
      }
      if (username.length > MAX_USERNAME_LENGTH) {
        setError("Username must have at most 20 characters.");
      }
      if (password.length < MIN_PASSWORD_LENGTH) {
        setError("Password must have at least 8 characters.");
      }
      if (!isValidEmail(email)) {
        setError("Please enter a valid email address.");
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
      }
    }

    if (!error) {
      register(username, email, password);
      setSuccessMessage("Account successfully registered!");

      // clears the input fields after user registers successfully
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  return (
    <div>
      <nav className="register-nav">
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
      <div className="register-container">
        <h2>Sign Up</h2>
        <div className="form-field">
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="register-btn" onClick={handleRegister}>
          Sign Up
        </button>
        <div>
          {successMessage && <p className="success">{successMessage}</p>}
          {error && <p className="error">{error}</p>}
        </div>
        <div>
          Already have an account? <Link to="/login">Login here!</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
