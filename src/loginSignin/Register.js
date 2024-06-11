import React from 'react';
import { useNavigate } from 'react-router-dom';
import './signIn.css';

function Register() {
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    navigate('/setup-email-password');
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <img
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
          alt="Google Logo"
          className="google-logo"
        />
        <h1>Create a Google Account</h1>
        <p>Enter your name</p>
        <form onSubmit={handleNext}>
          <input type="text" placeholder="First name" required />
          <input type="text" placeholder="Last name (optional)" />
          
          <p>Birthdate</p>
          <select required>
            <option value="">Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
          <input type="number" placeholder="Day" min="1" max="31" required />
          <input type="number" placeholder="Year" min="1900" max="2023" required />
          
          <p>Gender</p>
          <select required>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          
          <button type="submit" className="next-button">Next</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
