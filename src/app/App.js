import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import useUser from '../hooks/UseUser';
import useVideos from '../hooks/UseVideos';
import RoutesConfiguration from '../components/routesConfiguration/RoutesConfiguration';
import initializeDemoData from '../utils/initializeDemoData'; 


function App() {
  const { getUserByEmail, registerUser, setFirstName, updateUser, registeredUsers } = useUser([]);
  const {
    videoList,
    addVideo,
    setVideoList,
    deleteVideo,
    editVideo,
    comments,
    addComment,
    deleteComment,
    editComment,
    userInteractions,
    handleLike,
    handleDislike,
    likesDislikes,
    updateVideoViews
  } = useVideos([]);

  const [expanded, setExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
    document.body.classList.toggle('dark-mode');
  };

  const handleSignOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const handleRegisterUser = (userData) => {
    registerUser(userData);
    setUser({ ...userData, signedIn: true });
  };

  useEffect(() => {
    const initialize = async () => {
        const demoDataInitialized = localStorage.getItem('demoDataInitialized');
        console.log('Demo data initialized:', demoDataInitialized);
            await initializeDemoData();
        }
    console.log('App component mounted');
    initialize();
}, []);

  return (
    <Router>
      <div className={`container-fluid ${isDarkMode ? 'dark-mode' : ''}`}>
        <RoutesConfiguration
          user={user}
          setUser={setUser}
          videoList={videoList}
          comments={comments}
          addComment={addComment}
          deleteComment={deleteComment}
          editComment={editComment}
          userInteractions={userInteractions}
          handleLike={handleLike}
          handleDislike={handleDislike}
          likesDislikes={likesDislikes}
          deleteVideo={deleteVideo}
          editVideo={editVideo}
          getUserByEmail={getUserByEmail}
          updateVideoViews={updateVideoViews}
          handleRegisterUser={handleRegisterUser}
          registeredUsers={registeredUsers}
          updateUser={updateUser}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          expanded={expanded}
          setExpanded={setExpanded}
          handleSignOut={handleSignOut}
          addVideo={addVideo}
          token={token}
          setToken={setToken}
        />
      </div>
    </Router>
  );
}

export default App;
