import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import LeftMenu from '../leftMenu/LeftMenu';
import videosData from '../videoLogic/videoItem/Videos.json';
import Search from '../search/Search';
import VideoListResults from '../videoLogic/videoListResults/VideoListResults';
import VideoMain from '../videoLogic/videoMain/VideoMain';
import SearchResults from '../search/SearchResults';
import DarkModeButton from '../darkMode/DarkModeButton';

function App() {
  const [videoList, setVideoList] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [comments, setComments] = useState({});

  useEffect(() => {
    setVideoList(videosData);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
    document.body.classList.toggle('dark-mode');
  };

  const addComment = (videoId, comment) => {
    setComments((prevComments) => ({
      ...prevComments,
      [videoId]: [...(prevComments[videoId] || []), comment],
    }));
  };

  const deleteComment = (videoId, index) => {
    setComments((prevComments) => ({
      ...prevComments,
      [videoId]: prevComments[videoId].filter((_, i) => i !== index),
    }));
  };

  const editComment = (videoId, index, newText) => {
    setComments((prevComments) => ({
      ...prevComments,
      [videoId]: prevComments[videoId].map((comment, i) =>
        i === index ? { ...comment, text: newText } : comment
      ),
    }));
  };

  return (
    <Router>
      <div className="container-fluid">
        <div className="row">
          <LeftMenu expanded={expanded} setExpanded={setExpanded} />
          <div className={`col main-content ${expanded ? 'offset-md-3' : 'offset-md-1'}`}>
            <div className="search-signin-container">
              <Search className="search-bar" />
              <Link to="/" className="app-logo-link">
                <img src={isDarkMode ? "/images/logo-dark.svg" : "/images/logo-light.svg"} alt="Logo" className="app-logo" />
              </Link>
              <DarkModeButton toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
              <Link to="/signin" className="signin-link">
                <button type="button" className="btn btn-primary">
                  <span className="bi bi-person-circle" aria-hidden="true"></span>
                  <span className="signin-text">Sign in</span>
                </button>
              </Link>
            </div>
            <Routes>
              <Route path="/" element={<VideoListResults videos={videoList} />} />
              <Route path="/video/:id" element={
                <VideoMain
                  comments={comments}
                  addComment={addComment}
                  deleteComment={deleteComment}
                  editComment={editComment}
                />
              } />
              <Route path="/search" element={<SearchResults videos={videoList} />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
