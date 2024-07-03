import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../utils/tokenService'; 
import './SignIn.css';

const SignIn = ({ setUser }) => {
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

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await fetch('http://127.0.0.1:8080/api/tokens', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
  
        if (res.ok) {
          const data = await res.json();
          console.log('Data:', data);
          setToken(data.token); 
          setUser({ ...data.user, signedIn: true }); 
          console.log('User signed in:', data.user);
          navigate('/');
        } else {
          const error = await res.text();
          setErrors({ general: error });
        }
      } catch (error) {
        console.error('Error signing in:', error);
        setErrors({ general: 'Invalid email or password' });
      }
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
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
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
              onChange={handleShowPasswordChange}
            />
            <label>Show password</label>
          </div>
          <button type="submit">Next</button>
        </form>
        {errors.general && <span className="error">{errors.general}</span>}
        <a href="#">Forgot email?</a>
        <p>Not your computer? Use Guest mode to sign in privately.</p>
        <a href="#">Learn more</a>
        <button type="button" onClick={() => navigate('/signup')}>Create account</button>
      </div>
    </div>
  );
};

export default SignIn;