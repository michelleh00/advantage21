import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import PlayCalculator from './Calculator';
import Register from './Register';
import Contact from './Contact';
import Login from './Login';
import Rules from './Rules';
import Play from './Play';

function App() {
  return (
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
