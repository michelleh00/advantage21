import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const storedSettings = JSON.parse(localStorage.getItem('settings'));
  const initialSettings = storedSettings || {
    darkMode: false,
    soft17: false,
    surrender: false,
    handTimer: false,
    timerDuration: 10
  };

  const [settings, setSettings] = useState(initialSettings);
  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;