import React from 'react';
import './RegisterLayout.css'; // Ensure you have styles for this layout

function RegisterLayout({ children }) {
  return (
    <div className="register-layout">
      {children}
    </div>
  );
}

export default RegisterLayout;
