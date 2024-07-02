import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LeftMenu from '../components/leftMenu/LeftMenu';
import videosData from '../videoLogic/videoItem/Videos.json';
import demoUsers from '../mock/DemoUsers.const';
import useUser from '../hooks/UseUser';
import useVideos from '../hooks/UseVideos';
import SearchSignInContainer from '../components/searchSignInContainer/SearchSignInContainer';
import RoutesConfiguration from '../components/routesConfiguration/RoutesConfiguration';

function App() {
  const { getUserByEmail, registerUser, setFirstName } = useUser(demoUsers || []);
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


  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Initialize any other app-wide data or effects here
  }, []);

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
    setRegisteredUsers([...registeredUsers, userData]);
    
  };

  return (
    <Router>
      <div className={`container-fluid ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className="row">
          <LeftMenu expanded={expanded} setExpanded={setExpanded} />
          <div className={`col main-content ${expanded ? '' : 'collapsed'}`}>
            <SearchSignInContainer
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              user={user}
              handleSignOut={handleSignOut}
            />
            <RoutesConfiguration
              user={user}
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
              setUser={setUser}
              registeredUsers={registeredUsers}
            />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;