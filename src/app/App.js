import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LeftMenu from '../leftMenu/LeftMenu';
import videosData from '../videoItem/Videos';
import Search from '../search/Search';
import VideoListResults from '../videoListResults/VideoListResults';
import items from '../leftMenu/menuItems/MenuItems.json';
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
          <LeftMenu menuItems={items} expanded={expanded} setExpanded={setExpanded} />
          <div className={`col main-content ${expanded ? 'offset-md-3' : 'offset-md-1'}`}>
            <Routes>
              <Route path="/" element={
                <>
                  <div className="search-signin-container">
                    <Search />
                    <button type="button" className="btn btn-primary">Sign in</button>
                  </div>
                  <VideoListResults videos={videoList} />
                </>
              } />
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
