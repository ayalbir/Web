// src/UploadProfileImage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadProfileImage.css';

const UploadProfileImage = ({ registeredUsers, email }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const user = registeredUsers.find(user => user.email === email);
        user.profileImage = reader.result;
        navigate('/signin');
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload your profile image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file"
          accept="image/*"
          onChange={handleImageChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadProfileImage;
