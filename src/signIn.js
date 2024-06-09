import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './signIn.css';

function SignIn() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <img
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
          alt="Google Logo"
          className="google-logo"
        />
        <h1>Sign in</h1>
        <p>to continue to YouTube</p>
        <form>
          <input type="email" placeholder="Email or phone" required />
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Password"
            required
          />
          <div className="show-password">
            <input
              type="checkbox"
              id="show-password"
              checked={passwordVisible}
              onChange={handlePasswordVisibility}
            />
            <label htmlFor="show-password">Show password</label>
          </div>
          <div className="forgot-email">
            <a href="#">Forgot email?</a>
          </div>
          <button type="submit" className="next-button">Next</button>
        </form>
        <div className="other-options">
          <p>Not your computer? Use Guest mode to sign in privately.</p>
          <a href="#">Learn more about using Guest mode</a>
        </div>
        <div className="create-account">
          <Link to="/register">Create account</Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
