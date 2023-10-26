import React from 'react';
import { useAuth } from './Auth';

function Account() {
    const { userDetails } = useAuth();

    return (
        <div>
          <nav>
            <ul>
            <li><Link to="/calculator">Play Calculator</Link></li>
            <li><Link to="/play">Simulator</Link></li>
            <li><Link to="/rules">Rules</Link></li>
            <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
            <h1>Account Page</h1>
            <p>Username: {userDetails.username}</p>
            <p>Password: {userDetails.password}</p>
        </div>
    );
} 

export default Account;
