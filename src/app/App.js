import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LeftMenu from '../leftMenu/LeftMenu';
import videos from '../videoItem/Videos';
import Search from '../search/Search';
import VideoListResults from '../videoListResults/VideoListResults';
import items from '../leftMenu/menuItems/MenuItems.json';
import Tags from '../tags/Tags'; // Import the new Tags component
import VideoDetails from '../videoDetails/VideoDetails';

function App() {
  const [videoList, setVideoList] = useState(videos);
  const [expanded, setExpanded] = useState(true); // Add state for sidebar expansion

  const doSearch = (q) => {
    const query = q.toLowerCase();
    setVideoList(videos.filter(video => video.title.toLowerCase().includes(query)));
  };

  return (
    <Router>
      <div className="container-fluid">
        <div className="row">
          <LeftMenu menuItems={items} expanded={expanded} setExpanded={setExpanded} />
          <div className={`col main-content ${expanded ? 'offset-md-3' : 'offset-md-1'}`}>
            <Routes>
              <Route path="/" element={
                <>
                  <div className="row align-items-center mb-3">
                    <div className="col">
                      <Search doSearch={doSearch} />
                    </div>
                    <div className="col-auto">
                      <button type="button" className="btn btn-primary">Sign in</button>
                    </div>
                  </div>
                  <Tags />
                  <VideoListResults videos={videoList} />
                </>
              } />
              <Route path="/video/:id" element={<VideoDetails />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
