import React from 'react';
import './SetUpLayout.css'; // Ensure you have styles for this layout

function SetUpLayout({ children }) {
  return (
    <div className="SetUp-layout">
      {children}
    </div>
  );
}

export default SetUpLayout;
