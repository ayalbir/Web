import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoListResults from '../../videoLogic/videoListResults/VideoListResults';

const UserPage = ({ videos, getUserByEmail }) => {

  const { name } = useParams();
  const [userVideos, setUserVideos] = useState([]);

  useEffect(() => {
    if (name && videos) {
      const filteredVideos = videos.filter(video => {
        const uploader = getUserByEmail(video.email); 
        return uploader && uploader.email === name;
      });
      setUserVideos(filteredVideos);
    }
  }, [name, videos, getUserByEmail]);
  

  return (
    <div className="user-page">
      <h2>Videos uploaded by {getUserByEmail(name).firstName}</h2>
      <VideoListResults videos={userVideos} getUserByEmail={getUserByEmail} /> {/* Pass getUserByEmail to VideoListResults */}
    </div>
  );
};

export default UserPage;
