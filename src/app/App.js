import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import LeftMenu from '../leftMenu/LeftMenu';
import videosData from '../videoItem/Videos';
import Search from '../search/Search';
import VideoListResults from '../videoListResults/VideoListResults';
import VideoDetails from '../videoDetails/VideoDetails';
import SearchResults from '../search/SearchResults'; // Import the new component

function App() {
  const [videoList, setVideoList] = useState([]);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    setVideoList(videosData);
  }, []);

  return (
    <Router>
      <div className="container-fluid">
        <div className="row">
          <LeftMenu expanded={expanded} setExpanded={setExpanded} />
          <div className={`col main-content ${expanded ? 'offset-md-3' : 'offset-md-1'}`}>
            <div className="search-signin-container">
            <Link to="/" className="app-logo-link">
            <img src="/images/logo.svg" alt="Logo" className="app-logo" />
            </Link>

              <Search />
              <Link to ="/signin" className="signin-link">
              <button type="button" className="btn btn-primary">
                <span className="bi bi-person-circle" aria-hidden="true"></span>
                <span className="signin-text">Sign in</span>
              </button>
              </Link>
            </div>
            <Routes>
              <Route path="/" element={<VideoListResults videos={videoList} />} />
              <Route path="/video/:id" element={<VideoDetails />} />
              <Route path="/search" element={<SearchResults videos={videoList} />} /> {/* New route */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
