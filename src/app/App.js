import './App.css';
import LeftMenu from '../lefMenu/LeftMenu';
import videos from '../videoItem/Videos';
import Search from '../search/Search';
import { useState } from 'react';
import VideoListResults from '../videoListResults/VideoListResults';
import items from '../lefMenu/menuItems/MenuItems.json';

function App() {
  const [videoList, setVideoList] = useState(videos);


  const doSearch = function (item) {
    setVideoList(videos.filter((video) => video.title.includes(item)));
  }

  return (
    <div className="container-fluid">
      <div className='row'>
        <LeftMenu menuItems={items} />
        {/* put somewhere a row of buttons */}
        <div className='col main-content'>

          <Search doSearch={doSearch} />


          <div className='row bg-white'>
            <button type='button' className='btn btn-light col m-3 tag'>Light</button>
            <button type='button' className='btn btn-light col m-3 tag'>Lot</button>
            <button type='button' className='btn btn-light col m-3 tag'><i class="bi bi-house"></i></button>
          </div>
          <VideoListResults videos={videoList} />
        </div>

      </div>
    </div>
  );
}

export default App;
