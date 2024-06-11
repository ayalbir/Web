import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './signIn.css';

function UploadImage() {
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setError('Please select a valid image file');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      setError('Please upload an image');
      return;
    }
    const user = JSON.parse(localStorage.getItem(email));
    if (user) {
      user.image = image;
      localStorage.setItem(email, JSON.stringify(user));
      navigate('/');
    } else {
      setError('User not found');
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box upload-box">
        <img
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
          alt="Google Logo"
          className="google-logo"
        />
        <h1>Upload your profile image</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            style={{ marginBottom: '20px' }}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" className="next-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default UploadImage;
