import React from 'react';
import { useAuth } from './Auth';

function Account() {
    const { userDetails } = useAuth();

    return (
        <div>
            <h1>Account Page</h1>
            <p>Username: {userDetails.username}</p>
            <p>Password: {userDetails.password}</p>
        </div>
    );
} 

export default Account;
