// src/UserPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import videosData from '../videoLogic/videoItem/Videos.json';
import VideoListResults from '../videoLogic/videoListResults/VideoListResults';

const UserPage = () => {
  const { author } = useParams();
  const [videos, setVideos] = useState([]);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    // Filter videos by the author
    const userVideos = videosData.filter(video => video.author === author);
    setVideos(userVideos);

    // Assuming all videos from the same author have the same profile image
    if (userVideos.length > 0) {
      setProfileImage(userVideos[0].profileImage);
    }
  }, [author]);

  return (
    <div>
      <div className="author-info">
        {profileImage && <img src={profileImage} alt={`${author}'s profile`} className="profile-image" />}
        <h1>{author}'s Videos</h1>
      </div>
      <VideoListResults videos={videos} />
    </div>
  );
};

export default UserPage;
