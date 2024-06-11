import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signIn.css';

function SetupEmailPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = () => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }
    if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      return 'Password must contain both letters and numbers.';
    }
    if (password !== confirmPassword) {
      return 'Passwords do not match.';
    }
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    const passwordError = validatePassword();
    if (passwordError) {
      setError(passwordError);
      return;
    }
    const user = {
      email,
      password,
    };
    localStorage.setItem(email, JSON.stringify(user));
    navigate('/upload-image', { state: { email } });
  };

  return (
    <div className="signin-container">
      <div className="signin-box setup-box">
        <img
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
          alt="Google Logo"
          className="google-logo"
        />
        <h1>Use your existing email</h1>
        <p>Enter the email address you want to use for your Google Account</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <small>You'll need to confirm that this email belongs to you</small>
          <a href="#">Get a Gmail address instead</a>
          
          <h2>Create your password</h2>
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          {error && <p className="error">{error}</p>}
          <button type="submit" className="next-button">Next</button>
        </form>
      </div>
    </div>
  );
}

export default SetupEmailPassword;
