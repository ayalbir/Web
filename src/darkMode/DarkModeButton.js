import React, { useState } from 'react';
import './DarkModeButton.css';

const DarkModeButton = ({ toggleDarkMode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = () => {
    setIsDarkMode(prevMode => !prevMode);
    toggleDarkMode();
  };

  return (
    <div className="dark-mode-toggle">
      <input 
        type="checkbox" 
        className="checkbox" 
        id="darkModeCheckbox" 
        checked={isDarkMode} 
        onChange={handleToggle} 
      />
      <label htmlFor="darkModeCheckbox" className="label">
        <i className={`icon left ${isDarkMode ? 'bi bi-moon-fill' : ''}`}></i>
        <i className={`icon right ${isDarkMode ? '' : 'bi bi-sun-fill'}`}></i>
        <span className="ball"></span>
      </label>
    </div>
  );
};

export default DarkModeButton;
