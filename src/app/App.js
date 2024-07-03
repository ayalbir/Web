import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
// Removed the import of videosData as we are fetching them from the database
import demoUsers from '../mock/DemoUsers.const';
import useUser from '../hooks/UseUser';
import useVideos from '../hooks/UseVideos';
import RoutesConfiguration from '../components/routesConfiguration/RoutesConfiguration';

function App() {
  const { getUserByEmail, registerUser, setFirstName, updateUser, registeredUsers } = useUser(demoUsers || []);
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
    // Retrieve token and user from local storage
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
  
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
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
