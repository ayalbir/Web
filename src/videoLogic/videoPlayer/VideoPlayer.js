// src/videoDetails/VideoPlayer.js
import React from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ video }) => (
  <div className="video-player-container">
    <video className="video-player" controls>
      <source src={video.url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
);

export default VideoPlayer;
