import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signIn.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem(email));

    if (storedUser && storedUser.password === password) {
      setError('');
      navigate('/'); // successful login navigate to the home page or another protected route
    } else {
      setError('Username or password is incorrect');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(''); // Clear error on email change
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(''); // Clear error on password change
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
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email or phone"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <div className="show-password">
            <input
              type="checkbox"
              id="show-password"
              checked={passwordVisible}
              onChange={(e) => setPasswordVisible(e.target.checked)}
            />
            <label htmlFor="show-password">Show password</label>
          </div>
          <div className="forgot-email">
            <a href="#">Forgot email?</a>
          </div>
          {error && <p className="error">{error}</p>}
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
