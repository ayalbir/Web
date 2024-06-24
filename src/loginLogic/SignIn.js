// src/SignIn.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = ({ setUser, registeredUsers }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const user = registeredUsers.find(user => user.email === formData.email);
    if (!user) {
      newErrors.email = 'Email not found';
    } else if (user.password !== formData.password) {
      newErrors.password = 'Incorrect password';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const user = registeredUsers.find(user => user.email === formData.email);
      setUser({ ...user, signedIn: true });
      navigate('/');
    }
  };

  return (
    <div className="minimal-layout">
      <div className="signin-container">
        <h1 className="google-logo">Google</h1>
        <h2>Sign in</h2>
        <p>to continue to YouTube</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email or phone</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div>
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder='Enter your password'
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label>Show password</label>
          </div>
          <button type="submit">Next</button>
        </form>
        <a href="#">Forgot email?</a>
        <p>Not your computer? Use Guest mode to sign in privately.</p>
        <a href="#">Learn more</a>
        <button type="button" onClick={() => navigate('/signup')}>Create account</button>
      </div>
    </div>
  );
};

export default SignIn;