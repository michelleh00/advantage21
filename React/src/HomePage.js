import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      {/* Navigation for HomePage */}
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/calculator">Play Calculator</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      {/* Rest of the HomePage content */}
      <h1>Welcome to the Blackjack App!</h1>
    </div>
  );
}

export default HomePage;
