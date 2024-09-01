import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './UpdateProfile.css';

function UpdateProfile({ user, updateUser, setUser, deleteUser }) {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName || '');
            setEmail(user.email || '');
            setProfileImage(user.profileImage || null);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('User not found.');
            return;
        }
        if (user.email) {
            const updatedUserData = { firstName, email, password, profileImage };

            // Handle profile image if a new one is uploaded
            if (profileImage && profileImage instanceof File) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const updatedUser = {
                        ...user,
                        ...updatedUserData,
                        profileImage: reader.result,
                    };
                    updateUser(user.email, updatedUser);
                    setUser(updatedUser);
                    setIsSubmitted(true);
                };
                reader.readAsDataURL(profileImage);
            } else {
                const updatedUser = { ...user, ...updatedUserData };
                await updateUser(user.email, updatedUser);
                setUser(updatedUser);
                setIsSubmitted(true);
            }
        } else {
            alert('User email is missing.');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action is irreversible.')) {
            await deleteUser(user.email);
            setIsDeleted(true);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    if (!user || isDeleted) {
        return <Navigate to="/signin" />;
    }

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
                <button type="button" className="btn btn-danger" onClick={handleDelete}>
                    Delete Account
                </button>
            </form>
        </div>
    );
}

export default UpdateProfile;
