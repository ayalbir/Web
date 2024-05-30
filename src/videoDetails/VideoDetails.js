// src/videoDetails/VideoDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import videos from '../videoItem/Videos';

const VideoDetails = () => {
  const { id } = useParams();
  const video = videos.find(v => v.id === parseInt(id));

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <div className="video-details">
      <h2>{video.title}</h2>
      <p>{video.author}</p>
      <p>{video.views} views • {video.date}</p>
      <div>
        <img src={video.pic} alt={video.title} />
        <p>{video.description}</p>
      </div>
    </div>
  );
};

export default VideoDetails;
