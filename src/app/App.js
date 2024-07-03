import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import videosData from '../videoLogic/videoItem/Videos.json';
import demoUsers from '../mock/DemoUsers.const';
import useUser from '../hooks/UseUser';
import useVideos from '../hooks/UseVideos';
import RoutesConfiguration from '../components/routesConfiguration/RoutesConfiguration';

function App() {
  const { getUserByEmail, registerUser, setFirstName, updateUser, registeredUsers } = useUser(demoUsers || []);
  const {
    videoList,
    addVideo,
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
  } = useVideos(videosData);

  const [expanded, setExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
    document.body.classList.toggle('dark-mode');
  };

  const handleSignOut = () => {
    setUser(null);
  };

  const handleRegisterUser = (userData) => {
    registerUser(userData);
    setUser({ ...userData, signedIn: true });
  };

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
        />
      </div>
    </Router>
  );
}

export default App;
