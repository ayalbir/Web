// src/app/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import LeftMenu from '../components/leftMenu/LeftMenu';
import videosData from '../videoLogic/videoItem/Videos.json';
import demoUsers from '../mock/DemoUsers.const';
import useUser from '../hooks/UseUser';
import SearchSignInContainer from '../components/searchSignInContainer/SearchSignInContainer';
import RoutesConfiguration from '../components/routesConfiguration/RoutesConfiguration';

function App() {
  const [videoList, setVideoList] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [comments, setComments] = useState({}); // move this
  const [user, setUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]); // move this
  const [userInteractions, setUserInteractions] = useState({}); // move this
  const [likesDislikes, setLikesDislikes] = useState({}); // move this
  const { getUserByEmail } = useUser(registeredUsers);

  const updateUser = (updatedUserData) => {
    const updatedUser = { ...user, ...updatedUserData };
    setUser(updatedUser);
    const updatedRegisteredUsers = registeredUsers.map(u => u.email === updatedUser.email ? updatedUser : u);
    setRegisteredUsers(updatedRegisteredUsers);
  };

  const addVideo = (newVideo) => {
    setVideoList((prevList) => [...prevList, newVideo]);
  };

  useEffect(() => {
    setVideoList(videosData);
    setRegisteredUsers(demoUsers);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
    document.body.classList.toggle('dark-mode');
  };

  const addComment = (videoId, comment) => {
    setComments(prevComments => ({
      ...prevComments,
      [videoId]: [...(prevComments[videoId] || []), comment],
    }));
  };

  const deleteComment = (videoId, index) => {
    setComments(prevComments => ({
      ...prevComments,
      [videoId]: prevComments[videoId].filter((_, i) => i !== index),
    }));
  };

  const editComment = (videoId, index, newText) => {
    setComments(prevComments => ({
      ...prevComments,
      [videoId]: prevComments[videoId].map((comment, i) =>
        i === index ? { ...comment, text: newText } : comment
      ),
    }));
  };

  const handleLike = (videoId) => {
    setUserInteractions(prev => ({
      ...prev,
      [videoId]: { ...prev[videoId], like: !prev[videoId]?.like }
    }));
    setLikesDislikes(prev => ({
      ...prev,
      [videoId]: { ...prev[videoId], likes: (prev[videoId]?.likes || 0) + (userInteractions[videoId]?.like ? -1 : 1) }
    }));
  };

  const handleDislike = (videoId) => {
    setUserInteractions(prev => ({
      ...prev,
      [videoId]: { ...prev[videoId], dislike: !prev[videoId]?.dislike }
    }));
    setLikesDislikes(prev => ({
      ...prev,
      [videoId]: { ...prev[videoId], dislikes: (prev[videoId]?.dislikes || 0) + (userInteractions[videoId]?.dislike ? -1 : 1) }
    }));
  };

  const handleSignOut = () => {
    setUser(null);
  };

  const deleteVideo = (id) => {
    setVideoList((prevList) => prevList.filter(video => video.id !== id));
  };

  const editVideo = (id, newTitle, newDescription, newUrl) => {
    setVideoList((prevList) =>
      prevList.map(video =>
        video.id === id ? { ...video, title: newTitle, description: newDescription, url: newUrl } : video
      )
    );
  };

  const handleRegisterUser = (userData) => {
    setRegisteredUsers((prevUsers) => [...prevUsers, userData]);
    setUser({ ...userData, signedIn: true });
  };

  const updateVideoViews = (id) => {
    setVideoList(prevList =>
      prevList.map(video =>
        video.id === id ? { ...video, views: video.views + 1 } : video
      )
    );
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
              registeredUsers={registeredUsers} 
              setUser={setUser} 
              handleRegisterUser={handleRegisterUser} 
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
              updateUser={updateUser} 
              addVideo={addVideo} 
            />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;