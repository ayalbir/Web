import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'; 
import './UpdateProfile.css';

function UpdateProfile({ user, updateUser }) {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName || '');
            setEmail(user.email || '');
            setProfileImage(user.profileImage || null);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUser({ firstName, email, password, profileImage });
        setIsSubmitted(true);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // If no user, navigate to sign in page
    if (!user) {
        return <Navigate to="/signin" />;
    }

    // After form submission, navigate to home page
    if (isSubmitted) {
        return <Navigate to="/" />;
    }

    return (
        <div className="update-profile-container">
            <h2>Update Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <div className="password-input-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            type="checkbox"
                            id="showPasswordCheckbox"
                            className="checkbox-input"
                            onChange={togglePasswordVisibility}
                            checked={showPassword}
                        />
                        <label htmlFor="showPasswordCheckbox" className="checkbox-label">Show Password</label>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="profileImage">Profile Image:</label>
                    <input
                        type="file"
                        id="profileImage"
                        onChange={(e) => setProfileImage(e.target.files[0])}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Update Profile
                </button>
            </form>
        </div>
    );
}

export default UpdateProfile;
