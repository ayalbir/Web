import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import useUser from '../../hooks/UseUser'; // Import the useUser hook

const SignUp = () => {
  const { setFirstName } = useUser(); // Destructure the setFirstName function from useUser
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthdate: '',
    gender: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.birthdate) newErrors.birthdate = 'Birthdate is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setFirstName(formData.firstName);
      navigate('/sign-up-step-two', { state: { formData } });
    }
  };

  return (
    <div className="minimal-layout">
      <div className="signup-container">
        <h2>Create a Google Account</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>First name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>
          <div>
            <label>Last name (optional)</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Birthdate</label>
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
            />
            {errors.birthdate && <span className="error">{errors.birthdate}</span>}
          </div>
          <div>
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <span className="error">{errors.gender}</span>}
          </div>
          <button type="submit">Next</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
