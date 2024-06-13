// src/SignUpStepTwo.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpStepTwo.css';

const SignUpStepTwo = ({ email, firstName, setEmail, setPassword }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!emailPattern.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!passwordPattern.test(formData.password)) newErrors.password = 'Password must be at least 8 characters long and contain both letters and numbers';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setEmail(formData.email);
      setPassword(formData.password);
      navigate('/upload-profile-image');
    }
  };

  return (
    <div className="signup-container">
      <h2>Use your existing email</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email address</label>
          <input
            type="text"
            name="email"
            placeholder='Enter your email'
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <label>Create your password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder='Enter your password'
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div>
          <label>Confirm password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder='Enter your password'
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </div>
        <div className="checkbox-container">
          <input
            type="checkbox"
            name="showPassword"
            placeholder='Enter your password'
            checked={showPassword}
            onChange={handleShowPasswordChange}
          />
          <label>Show password</label>
        </div>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default SignUpStepTwo;
