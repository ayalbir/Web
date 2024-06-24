import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoListResults from '../videoLogic/videoListResults/VideoListResults';

const UserPage = ({ videos, getUserByEmail }) => {
  const { name } = useParams(); // Get the uploader's name from the route parameters
  const [userVideos, setUserVideos] = useState([]);

  useEffect(() => {
    if (name && videos) {
      // Filter videos based on the uploader's name using getUserByEmail
      const filteredVideos = videos.filter(video => {
        const uploader = getUserByEmail(video.author);
        return uploader && uploader.firstName === name;
      });
      setUserVideos(filteredVideos);
    }
  }, [name, videos, getUserByEmail]);

  return (
    <div className="user-page">
      <h2>Videos uploaded by {name}</h2>
      <VideoListResults videos={userVideos} getUserByEmail={getUserByEmail} /> {/* Pass getUserByEmail to VideoListResults */}
    </div>
  );
};

export default UserPage;
