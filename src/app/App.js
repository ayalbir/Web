import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import LeftMenu from '../leftMenu/LeftMenu';
import videosData from '../videoLogic/videoItem/Videos.json';
import Search from '../search/Search';
import CreateVideo from '../createVideo/CreateVideo';
import VideoListResults from '../videoLogic/videoListResults/VideoListResults';
import VideoMain from '../videoLogic/videoMain/VideoMain';
import SearchResults from '../search/SearchResults';
import DarkModeButton from '../darkMode/DarkModeButton';

const demoUser = {
  id: 1,
  name: "Demo User",
  signedIn: true,
};

function App() {
  const [videoList, setVideoList] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [comments, setComments] = useState({});
  const [user, setUser] = useState(demoUser);

  useEffect(() => {
    setVideoList(videosData);
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

  const handleSignOut = () => {
    setUser({ ...user, signedIn: false });
    // You can handle navigation here or pass down a prop to handle it in child components
  };

  return (
    <Router>
      <div className="container-fluid">
        <div className="row">
          <LeftMenu expanded={expanded} setExpanded={setExpanded} />
          <div className={`col main-content ${expanded ? 'offset-md-3' : 'offset-md-1'}`}>
            <div className="search-signin-container">
              <Link to="/create" className="btn create-button">
                <i className="bi bi-patch-plus"></i>
              </Link>
              <Search className="search-bar" />
              <Link to="/" className="app-logo-link">
                <img src={isDarkMode ? "/images/logo-dark.svg" : "/images/logo-light.svg"} alt="Logo" className="app-logo" />
              </Link>
              <DarkModeButton toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
              {user.signedIn ? (
                <button type="button" className="btn btn-primary" onClick={handleSignOut}>
                  <span className="bi bi-person-circle" aria-hidden="true"></span>
                  <span className="signin-text">Sign out</span>
                </button>
              ) : (
                <Link to="/signin" className="signin-link">
                  <button type="button" className="btn btn-primary">
                    <span className="bi bi-person-circle" aria-hidden="true"></span>
                    <span className="signin-text">Sign in</span>
                  </button>
                </Link>
              )}
            </div>
            <Routes>
              <Route path="/" element={<VideoListResults videos={videoList} />} />
              <Route path="/video/:id" element={
                <VideoMain
                  videos={videoList} // Pass the videoList state
                  comments={comments}
                  addComment={addComment}
                  deleteComment={deleteComment}
                  editComment={editComment}
                />
              } />
              <Route path="/search" element={<SearchResults videos={videoList} />} />
              <Route path="/create" element={<CreateVideo setVideoList={setVideoList} user={user} />} />
              <Route path="/signin" element={<h1>Sign In</h1>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
