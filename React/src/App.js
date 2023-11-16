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
import { SettingsProvider} from './Settings';
import './GoogleFonts.css';

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
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
      </SettingsProvider>
    </AuthProvider>
  );
}



export default App;
