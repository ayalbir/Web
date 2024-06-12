import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SignIn.css';

function UploadImage({ updateUserImage }) {
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
    updateUserImage(image); // Update user state with the uploaded image
    navigate('/signin'); // Navigate to the sign-in page
  };

  return (
    <div className="signin-container">
      <div className="signin-box upload-box">
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
          <button type="submit" className="next-button">Upload</button>
        </form>
      </div>
    </div>
  );
}

export default UploadImage;