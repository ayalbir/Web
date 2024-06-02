import React, { useState } from 'react';
import './LeftMenu.css'; // Assuming you have additional styles here
import items from './menuItems/MenuItems.json';

const LeftMenu = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className={`left-menu ${expanded ? 'expanded' : 'collapsed'} bg-light`}>
      <button onClick={() => setExpanded(!expanded)} className="toggle-menu-btn btn btn-secondary">
        {expanded ? '≡' : '≡'}
      </button>
      <ul className="list-group list-group-flush">
        {items.map((item, index) => (
          <li key={index} className="list-group-item d-flex align-items-center">
            <i className={`bi bi ${item.icon} menu-icon`}></i>
            {expanded && <span className="menu-text ms-3">{item.name}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftMenu;