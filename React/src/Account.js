import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import Switch from "./Switch";
import "./Account.css";
import Play from "./Play";
import { useSettings } from "./Settings";

// The user's profile is displayed here. We check first if user is logged in
// and display the appropriate nav options accordingly.
// Switches are used to apply app variations.

function Account() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { userDetails } = useAuth();
  const { settings, setSettings } = useSettings();
  const [selectedFile, setSelectedFile] = useState(null);
  const [highestMoves, setHighestMoves] = useState(0); 

  useEffect(() => {
    const storedHighestMoves = localStorage.getItem('highestMoves');
    if (storedHighestMoves) {
      setHighestMoves(parseInt(storedHighestMoves, 10));
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleLogout = () => {
    logout();
    // Redirect to the login page after logout
    navigate("/login");
  };

  useEffect(() => {


    if (settings.darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [settings.darkMode]);


  const handleDarkModeToggle = () =>
    setSettings({ ...settings, darkMode: !settings.darkMode });
  const handleSoft17Toggle = () =>
    setSettings({ ...settings, soft17: !settings.soft17 });
  const handleSurrenderToggle = () =>
    setSettings({ ...settings, surrender: !settings.surrender });
  const handleHandTimerToggle = () =>
    setSettings({ ...settings, handTimer: !settings.handTimer });
    const handleDeckChangeToggle = () =>
    setSettings({ ...settings, deckToggle: !settings.deckToggle });
    const handleTimerChange = (event) => {
      const newTimerDuration = parseInt(event.target.value);
      setSettings({ ...settings, timerDuration: newTimerDuration });
    };
    const handleDeckChange = (event) => {
    const newDeckNum = parseInt(event.target.value);
    setSettings({ ...settings, numDecks: newDeckNum });
    };
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/calculator">Play Calculator</Link>
          </li>
          <li>
            <Link to="/play">Simulator</Link>
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
              <li onClick={handleLogout}>Logout</li>
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
      <h1>Welcome, {userDetails.username}!</h1>

      <div className="acct-image">
        <label htmlFor="file-input" className="upload-label">
          {selectedFile ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="profile icon"
              className="profile-picture"
            />
          ) : (
            <>
              <img
                className="profile-picture"
                src="/resources/profile.png"
                alt="profile icon"
              />
              <span className="upload-text">
                Click Here to Upload a Picture
              </span>
            </>
          )}
        </label>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <div className={`acct-container ${settings.darkMode ? "dark-mode" : ""}`}>
        <div className="left-options">
          Dark Mode:
          <br />
          Dealer Hits on Soft 17:
          <br />
          Allow Surrender:
          <br />
          Hand Timer:
          <br />
          Number of Decks:
        </div>
        <div className="left-toggles">
          <Switch
            id="darkMode"
            checked={settings.darkMode}
            onChange={handleDarkModeToggle}
          />
          <Switch
            id="soft17"
            checked={settings.soft17}
            onChange={handleSoft17Toggle}
          />
          <Switch
            id="surrender"
            checked={settings.surrender}
            onChange={handleSurrenderToggle}
          />
          <Switch
            id="handTimer"
            checked={settings.handTimer}
            onChange={handleHandTimerToggle}
          />




              <select
                value={settings.numDecks}
                onChange={handleDeckChange}
                style={{ marginTop: '3.5em' }}
              >
                <option value={1}>1 Deck</option>
                <option value={2}>2 Decks</option>
                <option value={4}>4+ Decks</option>
              </select>

        </div>
        <div className="timer-menu">
          {settings.handTimer && (
            <div>
              <select
                value={settings.timerDuration}
                onChange={handleTimerChange}
              >
                <option value={5}>5 seconds</option>
                <option value={10}>10 seconds</option>
                <option value={30}>30 seconds</option>
              </select>
            </div>
            
          )}


        </div>
        <div className="streaks">
          Best Session Streak: {highestMoves}
        </div>
      </div>
    </div>
  );
}

export default Account;
