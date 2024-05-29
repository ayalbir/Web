import './App.css';
import LeftMenu from '../lefMenu/LeftMenu';
import videos from '../videoItem/Videos';
import Search from '../search/Search';
import { useEffect, useState } from 'react';
import VideoListResults from '../videoListResults/VideoListResults';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import Foo from '../Foo';

function App() {
  const [videoList, setVideoList] = useState([]);
  const [allVideos, setAllVideos] = useState([]);

  useEffect(() => {
    setAllVideos(videos);
    setVideoList(videos);
  }, []);

  const doSearch = function (item) {
    setVideoList(allVideos.filter(video => video.title.toLowerCase().includes(item.toLowerCase())));
  }

  return (
    <div className="container-fluid">
      <div className='row'>
        <BrowserRouter>
          <Link to='/'>Main</Link>
          <Link to='/details'>Details</Link>
          <Routes>
            <Route path='/details' element={<LeftMenu />}></Route>
            <Route path='/' element={<Foo />}></Route>
          </Routes>

          <div className='col main-content'>
            <Search doSearch={doSearch} />
            <div className='row bg-white'>
              <button type='button' className='btn btn-light col m-3 tag'>Light</button>
              <button type='button' className='btn btn-light col m-3 tag'>Light</button>
              <button type='button' className='btn btn-light col m-3 tag'>Light</button>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
