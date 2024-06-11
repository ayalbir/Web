import React from 'react';
import './SignInLayout.css'; // Ensure you have styles for this layout

function SignInLayout({ children }) {
  return (
    <div className="sign-in-layout">
      {children}
    </div>
  );
}

export default SignInLayout;
