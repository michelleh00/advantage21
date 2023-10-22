import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/calculator">Play Calculator</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      <h1>Welcome to the Blackjack App!</h1>
    </div>
  );
}

export default HomePage;