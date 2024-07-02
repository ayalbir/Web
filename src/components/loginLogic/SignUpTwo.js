import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SignUpTwo.css';


const SignUpTwo = ({ handleRegisterUser }) => {
    const location = useLocation();
    const initialData = location.state?.formData || {};
    const [formData, setFormData] = useState({
        ...initialData,
        email: '',
        password: '',
        confirmPassword: '',
        profileImage: ''
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
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
        if (!selectedImage) newErrors.profileImage = 'Profile image is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        const { confirmPassword, ...userData } = formData;
        console.log('User registered:', userData);
        e.preventDefault();
        if (validateForm()) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const profileImage = reader.result;
                handleRegisterUser({
                    email: userData.email,
                    password: userData.password,
                    firstName: userData.firstName,
                    profileImage
                });
                
                navigate('/signin'); // Navigate to the sign-in page
            };
            reader.readAsDataURL(selectedImage);
        }
    };

    return (
        <div className="signup-two-container">
            <div className="signup-container">
                <h2>Complete Your Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email address</label>
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
                        <label>Create your password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter your password"
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
                            placeholder="Enter your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
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
                    <div>
                        <label>Upload your profile image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {errors.profileImage && <span className="error">{errors.profileImage}</span>}
                    </div>
                    <button type="submit" className="button">Complete Signup</button>
                </form>
            </div>
        </div>
    );
};

export default SignUpTwo;
