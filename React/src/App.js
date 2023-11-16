import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import PlayCalculator from './Calculator';
import Register from './Register';
import Contact from './Contact';
import Login from './Login';
import Rules from './Rules';
import Play from './Play';
import Account from './Account';
import { AuthProvider } from './Auth';
import './GoogleFonts.css';
import { TimerProvider } from './TimerContext';

function App() {
  return (
    <AuthProvider>
      <TimerProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/calculator" element={<PlayCalculator />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/play" element={<Play />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </div>
      </Router>
      </TimerProvider>
    </AuthProvider>
  );
}

export default App;
