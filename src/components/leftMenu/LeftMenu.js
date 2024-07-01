import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LeftMenu.css';

const LeftMenu = ({ expanded, setExpanded }) => {
  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const items = [{ "name": "home", "id": "home", "link": "/", "icon": "bi-house" }]

  return (
    <div className={`left-menu ${expanded ? 'expanded' : 'collapsed'}`}>
      <button onClick={handleToggle} className="toggle-menu-btn">
        {expanded ? '≡' : '≡'}
      </button>
      <ul className="menu-list">
        {items.map((item, index) => (
          <li key={index} className="menu-item">
            <Link to={item.link} className="menu-link">
              <i className={`bi bi ${item.icon} menu-icon`}></i>
              <span className={expanded ? 'menu-text' : 'menu-text-collapsed'}>
                {item.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftMenu;
