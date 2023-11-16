import React, { useEffect } from "react";
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
  console.log("Settings:", settings);

  const handleLogout = () => {
    logout();
    // Redirect to the login page after logout
    navigate("/login");
  };

  useEffect(() => {
    console.log("Dark mode changed:", settings.darkMode);
    localStorage.setItem("darkMode", settings.darkMode ? "true" : "false");

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
  const handleTimerChange = (duration) =>
    setSettings({ ...settings, timerDuration: duration });

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
        <img src="/resources/profile.png" alt="profile icon" />
      </div>

      <div className={`acct-container ${settings.darkMode ? "dark-mode" : ""}`}>
        <div className="left-options">
          Dark Mode:
          <br />
          Hit on Soft 17:
          <br />
          Allow Surrender:
          <br />
          Hand Timer:
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
        </div>
        <div className="right-options">Hand Timer:</div>
        <div className="right-toggles">
          {settings.handTimer && (
            <div>
              Timer Duration:
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
          Best Session Streak:
          <br />
          Longest Streak:
        </div>
      </div>
    </div>
  );
}

export default Account;
