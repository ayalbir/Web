import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './signIn';
import Register from './Register';
import SetupEmailPassword from './SetupEmailPassword';
import UploadImage from './UploadImage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/setup-email-password" element={<SetupEmailPassword />} />
        <Route path="/upload-image" element={<UploadImage />} />
      </Routes>
    </div>
  );
}

export default App;
