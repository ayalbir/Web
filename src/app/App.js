import './App.css';
import VideoItem from '../videoItem/VideoItem';
import { useState } from 'react';
import LeftMenu from '../lefMenu/LeftMenu';
import VideoListResults from '../videoListResults/VideoListResults';
import Search from '../search/Search';

function App() {
  const [videoList, setVideoList] = useState(videos);

  const doSearch = function (item) {
    setVideoList(videos.filter(video => video.title.toLowerCase().includes(item.toLowerCase())));
  }

  return (
    <div className="container-fluid">
      <div className='row'>
        <LeftMenu />
        <div className='col main-content'>
          <Search doSearch={doSearch} />
          <div className='row bg-white'>
            <button type='button' className='btn btn-light col m-3 tag'>Light</button>
            <button type='button' className='btn btn-light col m-3 tag'>Light</button>
            <button type='button' className='btn btn-light col m-3 tag'>Light</button>
            <button type='button' className='btn btn-light col m-3 tag'>Light</button>
            <button type='button' className='btn btn-light col m-3 tag'>Light</button>
          </div>
          <VideoListResults videos={videoList} />
        </div>
      </div>
    </div>
  );
}

export default App;
