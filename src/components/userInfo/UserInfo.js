// src/components/userInfo/UserInfo.js

import React from 'react';
import { Link } from 'react-router-dom';
import './UserInfo.css';

const UserInfo = ({ user, handleSignOut }) => {
  // Function to ensure the profile image URL is correctly formatted
  const formatProfileImage = (image) => {
    if (image && !image.startsWith('data:image/')) {
      return `data:image/jpeg;base64,${image}`; // Adjust 'image/jpeg' if you use different image formats
    }
    return image;
  };

  return (
    <div className="user-info">
      {user ? (
        <div>
          <Link to="/update-profile" className="update-profile-link">
            {user.profileImage && (
              <img
                src={formatProfileImage(user.profileImage)} // Ensure the image URL is correctly formatted
                alt="Profile"
                className="profile-image"
              />
            )}
            <span className="user-details">{user.firstName}</span>
          </Link>
          <Link to="/signin" className="signin-link">
            <button type="button" className="btn btn-primary" onClick={handleSignOut}>
              <span className="bi bi-person-circle" aria-hidden="true"></span>
              <span className="signin-text">Sign out</span>
            </button>
          </Link>
        </div>
      ) : (
        <Link to="/signin" className="signin-link">
          <button type="button" className="btn btn-primary">
            <span className="bi bi-person-circle" aria-hidden="true"></span>
            <span className="signin-text">Sign in</span>
          </button>
        </Link>
      )}
    </div>
  );
};

export default UserInfo;
