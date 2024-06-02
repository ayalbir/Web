import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LeftMenu from '../leftMenu/LeftMenu';
import videos from '../videoItem/Videos';
import Search from '../search/Search';
import VideoListResults from '../videoListResults/VideoListResults';
import items from '../leftMenu/menuItems/MenuItems.json';
import VideoDetails from '../videoDetails/VideoDetails';
import tags from '../tags/Tags.json';

function App() {
  const [videoList, setVideoList] = useState(videos);

  const doSearch = (q) => {
    const query = q.toLowerCase();
    setVideoList(videos.filter(video => video.title.toLowerCase().includes(query)));
  };

  return (
    <Router>
      <div className="container-fluid">
        <div className="row">
          <LeftMenu menuItems={items} />
          <div className="col main-content">
            <Routes>
              <Route path="/" element={
                <>
                  <Search doSearch={doSearch} />
                  <div className="row bg-white">
                    {tags.map((tag, index) => (
                      <tag key={index} type="button" className={tag.className}>{tag.text}</tag>
                    ))}
                  </div>
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
