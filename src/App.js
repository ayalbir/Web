import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './signIn';
import Register from './Register';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
